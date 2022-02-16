<?php

namespace App\Http\Controllers;

use App\Models\ProtocolStudy;
use App\Models\ReceivedSample;
use App\Models\SampleBatch;
use App\Models\SampleTest;
use Illuminate\Http\Request;
use stdClass;
use PDF;

class ObservationController extends Controller
{
    public function getTests($sampleId)
    {
        $sample = ReceivedSample::with('protocol.tests.specifications', 'protocol.tests.test', 'protocol.tests.subTest')->where('SampleID', $sampleId)->first();
        $tests = $sample->protocol->tests->toArray();

        function formatSpecifications($specifications)
        {
            $formattedSpecs = [];
            foreach ($specifications as $specification) {
                $formattedSpecs[$specification['StudyID']] = $specification['Specifications'];
            }

            return $formattedSpecs;
        }

        $tests = array_map(function ($pTest) {
            $test = $pTest['sub_test'] ? $pTest['sub_test'] : $pTest['test'];
            return [
                'ProtocolTestID' => $pTest['ProtocolTestID'],
                'Name' => $test['Name'],
                'Specifications' => isset($pTest['specifications']) ? formatSpecifications($pTest['specifications']) : [],
                'IsMinMax' => $test['IsMinMax'] === "1",
                'IsDate' => $test['IsDate'] === "1",
            ];
        }, $tests);

        return response()->json([
            'tests' => $tests,
            'status' => 200
        ], 200);
    }

    public function getStudies($sampleId)
    {
        $sample = ReceivedSample::with('protocol.studyTypes.studyType')->where('SampleID', $sampleId)->first();
        $studies = $sample->protocol->studyTypes;
        return response()->json([
            'studies' => $studies,
            'status' => 200
        ], 200);
    }

    public function getObservations($sampleId)
    {
        $observations = SampleTest::where('SampleID', $sampleId)->get();
        return response()->json([
            'observations' => $observations,
            'status' => 200
        ], 200);
    }

    public function submitObservations(Request $request)
    {
        $observations = $request->observations;
        foreach ($observations as $observation) {

            $sampleTest = SampleTest::where('SampleID', $observation['SampleID'])
                ->where('ProtocolTestID', $observation['ProtocolTestID'])->where('Month', $observation['Month'])
                ->where('StudyID', $observation['StudyID'])->where('SampleBatchID', $observation['SampleBatchID'])->first();

            if ($sampleTest) {
                $sampleTest->update([
                    'Value' => $observation['Value'],
                    'Min' => $observation['Min'],
                    'Avg' => $observation['Avg'],
                    'Max' => $observation['Max']
                ]);
            } else {
                $sampleTest = SampleTest::create($observation);
            }
        }
        return response()->json([
            'message' => 'Observations saved',
            'status' => 200
        ], 200);
    }

    public function getSampleVariants($sampleId)
    {
        $sample = ReceivedSample::with('product.variants')->where('SampleID', $sampleId)->first();

        return response()->json([
            'variants' => $sample->product->variants,
            'status' => 200
        ], 200);
    }

    public function generateObservationReport($sampleId, $studyId, $batchId)
    {
        $sampleBatch = SampleBatch::with('variant')->find($batchId);
        $sample = ReceivedSample::with('product', 'protocol.tests.test.subTests', 'manufacturer')->find($sampleId);
        $observations = $sample->testsForBatchStudy($studyId, $batchId);
        $protocolStudy = ProtocolStudy::with('condition', 'studyType')->find($studyId);
        $months = json_decode($protocolStudy->Months);
        $allTests = $sample->protocol->tests;
        $product = $sample->product;
        $manufacturer = $sample->manufacturer;
        $variant = $sampleBatch->variant;

        $formattedResult = collect([]);

        foreach ($allTests as $test) {

            $resultTest = $formattedResult->first(function ($res) use ($test) {
                $testId = (string)$test->TestID;
                return $testId == $res->TestID;
            });

            if (!$resultTest) {
                $testObj = new stdClass();
                $testObj->Name = $test->test->Name;
                $testObj->TestID = $test->test->TestID;

                $resultObj = $test->test;

                if (isset($test->test->subTests) && $test->test->subTests->count() > 0) {
                    $resultObj = $test->test->subTests[0];
                    $testObj->SubTests = collect([]);

                    $subTestObj = new stdClass();
                    $subTestObj->Name = $resultObj->Name;
                    $subTestObj->Specifications = $resultObj->Specifications;
                    $subTestObj->IsMinMax = $resultObj->IsMinMax == "1";
                    $subTestObj->Months = new stdClass();

                    foreach ($months as $month) {
                        $observation = $observations->first(function ($obsrvtn) use ($studyId, $batchId, $test, $month) {
                            return $obsrvtn->StudyID == $studyId &&
                                $obsrvtn->SampleBatchID == $batchId &&
                                $obsrvtn->Month == $month &&
                                $obsrvtn->ProtocolTestID == $test->ProtocolTestID;
                        });

                        if ($observation) {
                            $subTestObj->Months->{$month} = [
                                'Value' => $observation->Value ? preg_replace('/\${}/', $observation->Value, $resultObj->Expression) : $resultObj->DefaultValue,
                                'Min' => $observation->Min ? preg_replace('/\${}/', $observation->Min, $resultObj->Expression) : $resultObj->DefaultValue,
                                'Avg' => $observation->Avg ? preg_replace('/\${}/', $observation->Avg, $resultObj->Expression) : $resultObj->DefaultValue,
                                'Max' => $observation->Max ? preg_replace('/\${}/', $observation->Max, $resultObj->Expression) : $resultObj->DefaultValue
                            ];
                        }
                    }

                    $testObj->SubTests->push($subTestObj);
                } else {
                    $testObj->IsMinMax = $resultObj->IsMinMax == "1";
                    $testObj->Specifications = $resultObj->Specifications;
                    $testObj->Months = new stdClass();

                    foreach ($months as $month) {
                        $observation = $observations->first(function ($obsrvtn) use ($studyId, $batchId, $test, $month) {
                            return $obsrvtn->StudyID == $studyId &&
                                $obsrvtn->SampleBatchID == $batchId &&
                                $obsrvtn->Month == $month &&
                                $obsrvtn->ProtocolTestID == $test->ProtocolTestID;
                        });
                        if ($observation) {
                            $testObj->Months->{$month} = [
                                'Value' => $observation->Value,
                                'Min' => $observation->Min,
                                'Avg' => $observation->Avg,
                                'Max' => $observation->Max
                            ];
                        }
                    }
                }
                $formattedResult->push($testObj);
            }
        }

        $pdf = PDF::loadView('observation', [
            'formattedResult' => $formattedResult,
            'months' => $months,
            'product' => $product,
            'manufacturer' => $manufacturer,
            'sampleBatch' => $sampleBatch,
            'protocolStudy' => $protocolStudy
        ])->setPaper('a4', 'landscape');

        return $pdf->download('report.pdf');
    }
}
