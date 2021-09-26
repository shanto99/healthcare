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
            $table->foreign('ManufacturerID')->references('ManufacturerID')->on('Manufacturers');
            $table->foreign('ProductID')->references('ProductID')->on('Products');
            $table->string('GRN');
            $table->string('Batch');
            $table->string('Remark');
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
        Schema::dropIfExists('received_samples');
    }
}
