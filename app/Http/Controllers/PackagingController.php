<?php

namespace App\Http\Controllers;

use App\Models\Packaging;
use Illuminate\Http\Request;

class PackagingController extends Controller
{
    public function save_packaging(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'Source' => 'required'
        ]);

        $packaging = Packaging::create($request->only('Name', 'Source', 'DMF', 'Resin', 'Colorant', 'Liner'));

        return response()->json([
            'packaging' => $packaging,
            'status' => 200
        ], 200);
    }
    public function get_packagings()
    {
        $packagings = Packaging::all();
        return response()->json([
            'packagings' => $packagings,
            'status' => 200
        ], 200);
    }
}
