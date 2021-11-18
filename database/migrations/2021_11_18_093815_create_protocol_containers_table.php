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
        Schema::create('protocol_containers', function (Blueprint $table) {
            $table->id('ProtocolContainerID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('ContainerID');
            $table->timestamps();
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
            $table->foreign('ContainerID')->references('ContainerID')->on('Containers');
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
