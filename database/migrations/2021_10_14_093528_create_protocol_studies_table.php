<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolStudiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolStudies', function (Blueprint $table) {
            $table->id('StudyID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('StudyTypeID');
            $table->unsignedBigInteger('ConditionID');
            $table->string('Months');
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
            $table->foreign('StudyTypeID')->references('StudyTypeID')->on('StudyTypes');
            $table->foreign('ConditionID')->references('ConditionID')->on('Conditions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('protocol_studies');
    }
}
