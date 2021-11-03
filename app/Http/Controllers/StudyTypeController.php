<?php

namespace App\Http\Controllers;

use App\Models\StudyType;
use Illuminate\Http\Request;

class StudyTypeController extends Controller
{
    public function create_study_type(Request $request)
    {
        $studyType = StudyType::create([
            'StudyName' => $request->StudyName,
            'StudyMonths' => $request->StudyMonths
        ]);

        return response()->json([
            'studyType' => $studyType,
            'status' => 200
        ], 200);
    }

    public function get_study_types()
    {
        return response()->json([
            'types' => StudyType::all(),
            'status' => 200
        ], 200);
    }

}
