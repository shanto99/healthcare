<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserController extends Controller
{
    public function create_user(Request $request)
    {
        $request->validate([
            'UserID' => 'required',
            'UserName' => 'required',
            'Phone' => 'required',
            'Password' => 'required'
        ]);

        $userData = $request->only('UserID', 'UserName', 'Phone');
        $userData['Password'] = bcrypt($request->Password);

        $user = User::create($userData);

        return response()->json([
            'user' => $user,
            'status' => 200
        ], 200);
    }

    public function get_user()
    {
        return response()->json([
           'user' => Auth::user(),
           'status' => 200
        ]);
    }
}
