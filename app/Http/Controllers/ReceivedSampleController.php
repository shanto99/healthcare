<?php

namespace App\Http\Controllers;

use App\Models\Protocol;
use App\Models\ReceivedSample;
use App\Models\SampleTest;
use Illuminate\Http\Request;

class ReceivedSampleController extends Controller
{
    public function save_received_sample(Request $request)
    {
        $request->validate([
            'AR' => 'required',
            'ReceivingDate' => 'required',
            'ManufacturerID' => 'required',
            'ProductID' => 'required',
            'ProtocolID' => 'required',
            'GRN' => 'required',
            'Batch' => 'required',
            'Remark' => 'required'
        ]);

        $receivedSample = ReceivedSample::create($request->only('AR', 'ReceivingDate', 'ManufacturerID', 'ProductID', 'ProtocolID', 'GRN', 'Batch', 'Remark'));

        $protocol = Protocol::find($request->ProtocolID);

        $tests = $protocol->tests;

        foreach ($tests as $test) {
            SampleTest::create([
                'AR' => $request->AR,
                'ProtocolTestID' => $test->ProtocolTestID
            ]);
        }

        return response()->json([
            'receivedSample' => $receivedSample,
            'status' => 200
        ], 200);
    }

    public function get_received_samples()
    {
        $samples = ReceivedSample::with('product', 'manufacturer')->get();
        return response()->json([
            'samples' => $samples,
            'status' => 200
        ], 200);
    }
}
