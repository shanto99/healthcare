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
            $table->string('AR');
            $table->unsignedBigInteger('ProtocolTestID');
            $table->string('Result')->nullable();
            $table->timestamps();

            $table->foreign('AR')->references('AR')->on('ReceivedSamples');
            $table->foreign('ProtocolTestID')->references('ProtocolTestID')->on('ProtocolTests');
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
