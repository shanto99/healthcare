<?php

namespace App\Http\Controllers;

use App\Models\ApiDetail;
use Illuminate\Http\Request;

class ApiDetailController extends Controller
{
    public function create_api_detail(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'Source' => 'required',
        ]);
        $api_details = ApiDetail::create($request->only('Name', 'Source'));

        return response()->json([
            'api_detail' => $api_details,
            'status' => 200
        ], 200);
    }

    public function get_api_details()
    {
        return response()->json([
            'api_details' => ApiDetail::all(),
            'status' => 200
        ], 200);
    }
}
