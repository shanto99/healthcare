<?php

namespace App\Http\Controllers;

use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
    public function create_condition(Request $request)
    {
        $condition = Condition::create([
           'Condition' => $request->Condition
        ]);

        return response()->json([
            'condition' => $condition,
            'status' => 200
        ], 200);
    }

    public function get_all_conditions()
    {
        return response()->json([
            'conditions' => Condition::all(),
            'status' => 200
        ], 200);
    }
}
