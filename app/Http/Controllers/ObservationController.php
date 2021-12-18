<?php

namespace App\Http\Controllers;

use App\Models\ReceivedSample;
use Illuminate\Http\Request;

class ObservationController extends Controller
{
    public function getTests($sampleId)
    {
        $sample = ReceivedSample::with('protocol.tests.test', 'protocol.tests.subTest')->where('AR', $sampleId)->first();
        $tests = $sample->protocol->tests;

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
        $sample = ReceivedSample::with('tests.test', 'tests.subTest')->find($sampleId);
        return response()->json([
            'sample' => $sample,
            'status' => 200
        ], 200);
    }
}
