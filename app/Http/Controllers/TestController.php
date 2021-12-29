<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{

    public function getParentTests()
    {
        $tests = Test::with('subTests')->where('Specifications', null)->get();
        return response()->json([
            'parent_tests' => $tests,
            'status' => 200
        ], 200);
    }

    public function getAllTessts()
    {
        $tests = Test::with('subTests')->get();
        return response()->json([
            'tests' => $tests,
            'status' => 200
        ], 200);
    }

    public function save_test(Request $request)
    {
        if ($request->ParentTest) {
            $parentTest = Test::find($request->ParentTest);
            $test = $parentTest->subTests()->create([
                'Name' => $request->TestName,
                'Specifications' => $request->Specifications,
                'Expression' => $request->Expression,
                'DefaultValue' => $request->DefaultValue
            ]);
        } else {

            if ($request->has('ChildTestName') && $request->ChildTestName) {
                $test = Test::create([
                    'Name' => $request->TestName
                ]);
                $test->subTests()->create([
                    'Name' => $request->ChildTestName,
                    'Specifications' => $request->ChildSpecifications,
                    'Expression' => $request->Expression,
                    'DefaultValue' => $request->DefaultValue
                ]);
            } else {
                $test = Test::create([
                    'Name' => $request->TestName,
                    'Specifications' => $request->Specifications,
                    'Expression' => $request->Expression,
                    'DefaultValue' => $request->DefaultValue
                ]);
            }
        }

        return response()->json([
            'test' => $test,
            'status' => 200
        ], 200);
    }
}
