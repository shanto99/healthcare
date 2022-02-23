<?php

namespace App\Http\Controllers;

use App\Models\SampleBatch;
use Illuminate\Http\Request;

class BatchController extends Controller
{
    public function saveBatch(Request $request)
    {
        $batch =  SampleBatch::create($request->all());

        // save planned withdraw date



        return response()->json([
            'batch' => $batch,
            'status' => 200
        ], 200);
    }

    public function getSampleBatches($sampleId)
    {
        $batches = SampleBatch::where('SampleID', $sampleId)->get();
        return response()->json([
            'batches' => $batches,
            'status' => 200
        ], 200);
    }
}
