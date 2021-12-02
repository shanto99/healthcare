<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestContainerCounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TestContainerCounts', function (Blueprint $table) {
            $table->id('TestContainerCountID');
            $table->unsignedBigInteger('ProtocolTestID');
            $table->unsignedBigInteger('VariantID');
            $table->unsignedBigInteger('Count');
            $table->timestamps();

            $table->foreign('ProtocolTestID')->references('ProtocolTestID')->on('ProtocolTests');
            $table->foreign('VariantID')->references('VariantID')->on('Variants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_container_counts');
    }
}
