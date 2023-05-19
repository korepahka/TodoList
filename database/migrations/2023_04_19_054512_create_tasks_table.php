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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();;
            $table->dateTime('date_ending');
            $table->bigInteger('priority');
            $table->bigInteger('status');
            $table->timestamps();

            $table->unsignedBigInteger('creator_id');
            $table->unsignedBigInteger('responsible_id');

            $table->index('creator_id', 'task_creator_idx');
            $table->index('responsible_id', 'task_responsible_idx');


            $table->foreign('creator_id', 'task_creator_fk')->on('users')->references('id');
            $table->foreign('responsible_id', 'task_cresponsible_fk')->on('users')->references('id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
