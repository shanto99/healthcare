<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Protocols', function (Blueprint $table) {
            $table->id('ProtocolID');
            $table->unsignedBigInteger('ProductID');
            $table->unsignedBigInteger('MarketID');
            $table->unsignedBigInteger('ManufacturerID');
            $table->unsignedBigInteger('ApiDetailID');
            $table->string('Reference');
            $table->text('ContainerCounts');

            $table->foreign('ProductID')->references('ProductID')->on('Products');
            $table->foreign('MarketID')->references('MarketID')->on('Markets');
            $table->foreign('ManufacturerID')->references('ManufacturerID')->on('Manufacturers');
            $table->foreign('ApiDetailID')->references('ApiDetailID')->on('ApiDetails');
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
        Schema::dropIfExists('protocols');
    }
}
