<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReceivedSamplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ReceivedSamples', function (Blueprint $table) {
            $table->string('AR')->primary();
            $table->date('ReceivingDate');
            $table->unsignedBigInteger('ManufacturerID');
            $table->unsignedBigInteger('ProductID');
            $table->unsignedBigInteger('ProtocolID');
            $table->string('GRN');
            $table->string('Batch');
            $table->string('Remark');
            $table->timestamps();
            $table->foreign('ManufacturerID')->references('ManufacturerID')->on('Manufacturers');
            $table->foreign('ProductID')->references('ProductID')->on('Products');
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('received_samples');
    }
}
