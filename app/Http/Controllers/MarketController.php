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
        ]);

        if ($request->MarketID) {
            $market = Market::find($request->MarketID);
            $market->update([
                'Name' => $request->Name
            ]);
        } else {
            $market = Market::create($request->only('Name'));
        }

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
