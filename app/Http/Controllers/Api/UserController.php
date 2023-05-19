<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // $first = DB::table('users')
        //     ->where('id', 2)
        //     ->select('users.id');

        return UserResource::collection(User::query()
            ->leftJoin('users as m', 'users.head_user_id', '=', 'm.id')
            ->select('users.*')
            ->where('m.id',  Auth::id())
            ->orWhere('users.id', Auth::id())
            ->orderBy('users.name')
            ->get());

    //   return UserResource::collection(User::query()->orderBy('id')->paginate(100));
      // return UserResource::collection(User::all());


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
