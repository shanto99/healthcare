<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSampleTests extends Migration
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
            $table->unsignedBigInteger('StudyID');
            $table->unsignedBigInteger('SampleBatchID');
            $table->integer('Month');
            $table->string('Value')->nullable();
            $table->string('Min')->nullable();
            $table->string('Max')->nullable();
            $table->string('Avg')->nullable();
            $table->timestamps();

            $table->foreign('AR')->references('AR')->on('ReceivedSamples');
            $table->foreign('ProtocolTestID')->references('ProtocolTestID')->on('ProtocolTests');
            $table->foreign('StudyID')->references('StudyID')->on('ProtocolStudies');
            $table->foreign('SampleBatchID')->references('SampleBatchID')->on('SampleBatches');
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
