<?php

namespace App\Http\Controllers;

use App\Models\Manufacturer;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function create_manufacturer(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'Address' => 'required',
            'Phone' => 'required|unique:Manufacturers',
            'Email' => 'email|unique:Manufacturers'
        ]);

        $manufacturers = Manufacturer::create($request->only('Name', 'Address', 'Phone', 'Email'));

        return response()->json([
            'manufacturer' => $manufacturers,
            'status' => 200
        ], 200);
    }

    public function get_manufacturers()
    {
        return response()->json([
            'manufacturers' => Manufacturer::all(),
            'status' => 200
        ], 200);
    }
}
