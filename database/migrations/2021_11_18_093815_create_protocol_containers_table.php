<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolContainersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolContainers', function (Blueprint $table) {
            $table->id('ProtocolContainerID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('VariantID');
            $table->integer('Count');
            $table->unsignedBigInteger('Primary');
            $table->unsignedBigInteger('Secondary');
            $table->unsignedBigInteger('Tertiary');
            $table->timestamps();
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
            $table->foreign('Primary')->references('ContainerID')->on('Containers');
            $table->foreign('Secondary')->references('ContainerID')->on('Containers');
            $table->foreign('Tertiary')->references('ContainerID')->on('Containers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('protocol_containers');
    }
}
