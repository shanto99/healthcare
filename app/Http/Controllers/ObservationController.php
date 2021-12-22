<?php

namespace App\Http\Controllers;

use App\Models\ReceivedSample;
use App\Models\SampleTest;
use Illuminate\Http\Request;

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
        $tests = $request->tests;
        foreach ($tests as $test) {
            SampleTest::where('SampleTestID', $test['SampleTestID'])->update([
                'Min' => $test['Min'],
                'Avg' => $test['Avg'],
                'Max' => $test['Max'],
                'Value' => $test['Value']
            ]);
        }
        return response()->json([
            'message' => 'Observation saved',
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
}
