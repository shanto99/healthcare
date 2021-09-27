<?php

namespace App\Http\Controllers;

use App\Models\Market;
use Illuminate\Http\Request;

class MarketController extends Controller
{
    public function create_market(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'MarketCondition' => 'required'
        ]);

        $market = Market::create($request->only('Name','MarketCondition'));

        return response()->json([
            'market' => $market,
            'status' => 200
        ], 200);
    }

    public function get_markets()
    {
        return response()->json([
            'markets' => Market::all(),
            'status' => 200
        ], 200);
    }
}
