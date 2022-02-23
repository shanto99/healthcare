<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestSpecificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TestSpecifications', function (Blueprint $table) {
            $table->id('TestSpecificationID');
            $table->unsignedBigInteger('ProtocolTestID');
            $table->unsignedBigInteger('VariantID');
            $table->text('Specifications');
            $table->timestamps();

            $table->foreign('ProtocolTestID')->references('ProtocolTestID')->on('ProtocolTests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_specifications');
    }
}
