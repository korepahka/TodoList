<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            'name' => 'React',
            'description' => '',
            'date_ending' => '2023-05-16 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 2,
            'responsible_id' => 5
            
        ]);

        DB::table('tasks')->insert([
            'name' => '.NET',
            'description' => '',
            'date_ending' => '2023-05-01 00:00:00',
            'status' => '2',
            'priority' => '2',
            'creator_id' => 2,
            'responsible_id' => 5
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'JS',
            'description' => '',
            'date_ending' => '2023-05-30 00:00:00',
            'status' => '2',
            'priority' => '1',
            'creator_id' => 2,
            'responsible_id' => 5
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'PHP',
            'description' => '',
            'date_ending' => '2023-06-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 2,
            'responsible_id' => 5
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'Java',
            'description' => '',
            'date_ending' => '2023-05-20 00:00:00',
            'status' => '3',
            'priority' => '3',
            'creator_id' => 2,
            'responsible_id' => 4
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'c#',
            'description' => '',
            'date_ending' => '2023-06-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 2,
            'responsible_id' => 4
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'sql',
            'description' => '',
            'date_ending' => '2023-05-01 00:00:00',
            'status' => '2',
            'priority' => '2',
            'creator_id' => 2,
            'responsible_id' => 4
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'c++',
            'description' => '',
            'date_ending' => '2023-06-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 4,
            'responsible_id' => 5
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'laravel',
            'description' => '',
            'date_ending' => '2023-05-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 3,
            'responsible_id' => 8
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'laravel',
            'description' => '',
            'date_ending' => '2023-05-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 3,
            'responsible_id' => 7
            
        ]);

        DB::table('tasks')->insert([
            'name' => 'laravel',
            'description' => '',
            'date_ending' => '2023-05-01 00:00:00',
            'status' => '1',
            'priority' => '1',
            'creator_id' => 3,
            'responsible_id' => 6
            
        ]);
    }
}
