<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function generateReport()
    {
        $reportData = DB::select(DB::raw('EXEC sp_Report1'));
        return response()->json([
            'batches' => $reportData,
            'status' => 200
        ], 200);
    }
}
