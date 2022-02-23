<?php

namespace App\Http\Controllers;

use App\Models\Protocol;
use App\Models\ReceivedSample;
use App\Models\SampleTest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReceivedSampleController extends Controller
{
    public function generateSampleId()
    {
        $yearMonthString = Carbon::today()->format('Y-m');
        $count = ReceivedSample::whereBetween('created_at', [Carbon::today()->startOfYear(), Carbon::today()->endOfYear()])->count();
        $count += 1;
        return $yearMonthString . '-' . $count;
    }
    public function save_received_sample(Request $request)
    {
        $request->validate([
            'ReceivingDate' => 'required',
            'ManufacturerID' => 'required',
            'ProductID' => 'required',
            'ProtocolID' => 'required',
            'GRN' => 'required',
            'Remark' => 'required'
        ]);

        $sampleId = $this->generateSampleId();

        $sampleData = $request->only(
            'ReceivingDate',
            'ManufacturerID',
            'ProductID',
            'ProtocolID',
            'GRN',
            'Remark'
        );

        $sampleData['SampleID'] = $sampleId;

        $receivedSample = ReceivedSample::create($sampleData);

        // $protocol = Protocol::find($request->ProtocolID);

        // $studies = $protocol->studyTypes;

        // $tests = $protocol->tests;

        // foreach ($studies as $study) {
        //     $months = json_decode($study->Months);
        //     foreach ($months as $month) {
        //         foreach ($tests as $test) {
        //             SampleTest::create([
        //                 'AR' => $request->AR,
        //                 'ProtocolTestID' => $test->ProtocolTestID,
        //                 'StudyID' => $study->StudyID,
        //                 'Month' => $month
        //             ]);
        //         }
        //     }
        // }

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
