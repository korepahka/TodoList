<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('admin')->default(0);
            $table->rememberToken();
            $table->timestamps();

            $table->unsignedBigInteger('head_user_id')->nullable()->default(1);;;
            $table->index('head_user_id', 'task_head_user_idx');
            $table->foreign('head_user_id', 'task_head_user_fk')->on('users')->references('id');



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
