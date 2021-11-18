<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContainerPackaging extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('container_packaging', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ContainerID');
            $table->unsignedBigInteger('PackagingID');
            $table->timestamps();
            $table->foreign('ContainerID')->references('ContainerID')->on('Containers');
            $table->foreign('PackagingID')->references('PackagingID')->on('Packagings');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('container_packaging');
    }
}
