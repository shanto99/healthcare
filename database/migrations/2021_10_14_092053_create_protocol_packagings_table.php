<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProtocolPackagingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProtocolPackagings', function (Blueprint $table) {
            $table->id('ProtocolPackagingID');
            $table->unsignedBigInteger('ProtocolID');
            $table->unsignedBigInteger('VariantID');
            $table->integer('Count');
            $table->unsignedBigInteger('Primary')->nullable();
            $table->unsignedBigInteger('Secondary')->nullable();
            $table->unsignedBigInteger('Tertiary')->nullable();
            $table->foreign('ProtocolID')->references('ProtocolID')->on('Protocols');
            $table->foreign('VariantID')->references('VariantID')->on('Variants');
            $table->foreign('Primary')->references('ContainerID')->on('Containers');
            $table->foreign('Secondary')->references('ContainerID')->on('Containers');
            $table->foreign('Tertiary')->references('ContainerID')->on('Containers');
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
        Schema::dropIfExists('protocol_packagings');
    }
}
