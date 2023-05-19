<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\v1\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $activeUsers = DB::table('users')
                ->join('users as m', 'users.head_user_id', '=', 'm.id')
                ->select('users.id')
                ->where('m.id',  2);

    
        return $tasks = DB::table('tasks')
            ->join('users as u1', 'u1.id', '=', 'tasks.creator_id')
            ->join('users as u2', 'u2.id', '=', 'tasks.responsible_id')
            ->select('tasks.*', 'u1.name as creator_name', 'u2.name as responsible_name')
            // ->where('tasks.creator_id',  Auth::id())
            // ->orWhere('tasks.responsible_id',  Auth::id())
            ->orwhere('tasks.creator_id',  $activeUsers)
            ->orWhere('tasks.responsible_id',  $activeUsers)
            ->orderBy('tasks.date_ending')
            ->get();

    }

    public function show(Task $task) {
        return new TaskResource($task);
    }

    public function store(StoreTaskRequest $request) {

        $users = User::all();

        $data = $request->validated();
        $task = Task ::create([
            'name' => $data['name'],
            'date_ending' => $data['date_ending'],
            'description' => $data['description'],
            'status' => $data['status'],
            'priority' => $data['priority'],
            'creator_id' => $data['creator_id'],
            'responsible_id' => $data['creator_id'],

        ]);

        return response()->json("Task Create");

    }

    public function update(StoreTaskRequest $request, Task $task) {
        $data = $request->validated();

        $task->update($data);

        return response()->json("Task Update");
    }

    public function destroy(Task $task) {
        $task->delete();

        return response("", 204);

    }
}
