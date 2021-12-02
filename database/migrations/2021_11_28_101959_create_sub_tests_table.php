<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SubTests', function (Blueprint $table) {
            $table->id('SubTestID');
            $table->unsignedBigInteger('TestID');
            $table->string('Name');
            $table->string('Specifications');
            $table->boolean('IsMinMax')->default(false);
            $table->timestamps();
            $table->foreign('TestID')->references('TestID')->on('Tests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_tests');
    }
}
