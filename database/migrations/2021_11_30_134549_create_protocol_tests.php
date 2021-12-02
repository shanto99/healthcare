<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolTests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolTests', function (Blueprint $table) {
            $table->id('ProtocolTestID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('TestID');
            $table->unsignedBigInteger('SubTestID');
            $table->timestamps();

            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
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
        Schema::dropIfExists('protocol_tests');
    }
}
