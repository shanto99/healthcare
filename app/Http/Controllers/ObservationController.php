<?php

namespace App\Http\Controllers;

use App\Models\ProtocolStudy;
use App\Models\ReceivedSample;
use App\Models\SampleBatch;
use App\Models\SampleTest;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class ObservationController extends Controller
{
    public function getTests($sampleId)
    {
        $sample = ReceivedSample::with('protocol.tests.test', 'protocol.tests.subTest')->where('AR', $sampleId)->first();
        $tests = $sample->protocol->tests->toArray();

        $tests = array_map(function ($pTest) {
            $test = $pTest['sub_test'] ? $pTest['sub_test'] : $pTest['test'];
            return [
                'ProtocolTestID' => $pTest['ProtocolTestID'],
                'Name' => $test['Name'],
                'Specifications' => $test['Specifications'],
                'IsMinMax' => $test['IsMinMax'] === "1"
            ];
        }, $tests);

        return response()->json([
            'tests' => $tests,
            'status' => 200
        ], 200);
    }

    public function getStudies($sampleId)
    {
        $sample = ReceivedSample::with('protocol.studyTypes.studyType')->where('AR', $sampleId)->first();
        $studies = $sample->protocol->studyTypes;
        return response()->json([
            'studies' => $studies,
            'status' => 200
        ], 200);
    }

    public function getObservations($sampleId)
    {
        $observations = SampleTest::where('AR', $sampleId)->get();
        return response()->json([
            'observations' => $observations,
            'status' => 200
        ], 200);
    }

    public function submitObservations(Request $request)
    {
        $observations = $request->observations;
        foreach ($observations as $observation) {

            $sampleTest = SampleTest::where('AR', $observation['AR'])
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
        $sample = ReceivedSample::with('product.variants')->where('AR', $sampleId)->first();

        return response()->json([
            'variants' => $sample->product->variants,
            'status' => 200
        ], 200);
    }

    public function generateObservationReport($sampleId, $studyId, $batchId)
    {
        // $sampleBatch = SampleBatch::with('variant')->find($batchId);
        $sample = ReceivedSample::with('product', 'protocol.tests.test.subTests')->find($sampleId);
        $observations = $sample->testsForBatchStudy($studyId, $batchId);
        $protocolStudy = ProtocolStudy::with('condition', 'studyType')->find($studyId);
        $allTests = $sample->protocol->tests;

        $formattedResult = [];

        foreach ($allTests as $test) {
            $observation = $observations->first(function ($obsrvtn) use ($studyId, $batchId, $test) {
                return $obsrvtn->StudyID == $studyId && $obsrvtn->SampleBatchID == $batchId && $obsrvtn->ProtocolTestID == $test->ProtocolTestID;
            });

            if ($observation) {
                $test->Value = $observation->Value;
                $test->Min = $observation->Min;
                $test->Avg = $observation->Avg;
                $test->Max = $observation->Max;
            }

            array_push($formattedResult, $observation);
        }

        return response()->json([
            'sample' => $sample,
            'allTests' => $sample->protocol->tests,
            'tests' => $observations,
            'study' => $protocolStudy,
            'result' => $formattedResult
        ]);
    }
}
