<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSampleTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SampleTests', function (Blueprint $table) {
            $table->id('SampleTestID');
            $table->unsignedBigInteger('TestID');
            $table->unsignedBigInteger('SubTestID');
            $table->string('result');
            $table->timestamps();

            $table->foreign('TestID')->references('TestID')->on('Tests');
            $table->foreign('SubTestID')->references('SubTestID')->on('SubTests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sample_tests');
    }
}
