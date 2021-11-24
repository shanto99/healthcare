<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestCountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TestCounts', function (Blueprint $table) {
            $table->id('TestCountID');
            $table->unsignedBigInteger('TestID');
            $table->unsignedBigInteger('VariantID');
            $table->integer('Count');
            $table->timestamps();
            $table->foreign('TestID')->references('TestID')->on('ProtocolTests');
            $table->foreign('VariantID')->references('VariantID')->on('Variants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_counts');
    }
}
