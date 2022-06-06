<?php

namespace App\Http\Controllers\API\Auth;

use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {  
        $user = User::where('UserId',$request->UserId)->first();
       
        if($user) {
            if(Hash::check($request->Password, $user->Password)) {
                Auth::login($user, true);
                $user->saveToken();
                return new UserResource($user);
            }
        }

        return $this->error('Authentication failed',null,401);
    }

    public function logout()
    {
        $user = Auth::guard('api')->user();

        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return $this->success($user, 'You are logged out!');
    }
}
