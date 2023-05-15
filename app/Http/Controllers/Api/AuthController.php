<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User ::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt(($data['password'])),

        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(
            ['user' => $user,
             'token' => $token]);

    }

    public function login(LoginRequest $request)
    {
       $credentials =$request->validated();

       if (!Auth::attempt($credentials)) {
        return response([
            'message' => 'Email или пароль некорректны'
        ], 422);
       }
       $user = Auth::user();
       $token = $user->createToken('main')->plainTextToken;
       
       return response(
        ['user' => $user,
         'token' => $token]);        
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);

    }

}
