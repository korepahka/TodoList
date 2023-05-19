<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Head',
            'email' => 'head@test.com',
            'password' => Hash::make('password'),
            'admin' => 1
        ]);

        DB::table('users')->insert([
            'name' => 'Manager1',
            'email' => 'manager1@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 1,
            'admin' => 0

        ]);

        DB::table('users')->insert([
            'name' => 'Manager2',
            'email' => 'manager2@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 1,
            'admin' => 0
            
        ]);

        DB::table('users')->insert([
            'name' => 'User1',
            'email' => 'user1@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 2,
            'admin' => 0
        ]);

        DB::table('users')->insert([
            'name' => 'User2',
            'email' => 'user2@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 2,
            'admin' => 0
        ]);

        DB::table('users')->insert([
            'name' => 'User3',
            'email' => 'user3@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 2,
            'admin' => 0
        ]);

        DB::table('users')->insert([
            'name' => 'User4',
            'email' => 'user4@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 3,
            'admin' => 0
        ]);

        DB::table('users')->insert([
            'name' => 'User5',
            'email' => 'user5@test.com',
            'password' => Hash::make('password'),
            'head_user_id' => 3,
            'admin' => 0
        ]);
    }
}
