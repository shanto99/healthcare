<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolStpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolStps', function (Blueprint $table) {
            $table->id('StpID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('VariantID');
            $table->string('StpNo');
            $table->string('SpecificationNo');
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
        Schema::dropIfExists('protocol_stps');
    }
}
