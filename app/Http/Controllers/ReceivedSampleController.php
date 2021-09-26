<?php

namespace App\Http\Controllers;

use App\Models\ReceivedSample;
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
            'GRN' => 'required',
            'Batch' => 'required',
            'Remark' => 'required'
        ]);

        $receivedSample = ReceivedSample::create($request->only('AR', 'ReceivingDate', 'ManufacturerID', 'ProductID', 'GRN', 'Batch', 'Remark'));

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
