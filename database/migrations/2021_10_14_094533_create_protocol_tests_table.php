<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolTests', function (Blueprint $table) {
            $table->id('TestID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('VariantID');
            $table->string('TestName');
            $table->integer('Quantity');
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
            $table->foreign('VariantID')->references('VariantID')->on('Variants');
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
        Schema::dropIfExists('protocol_tests');
    }
}
