<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpecificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Specifications', function (Blueprint $table) {
            $table->id('SpecificationID');
            $table->unsignedBigInteger('ProtocolTestID');
            $table->unsignedBigInteger('StudyID');
            $table->text('Specification');
            $table->timestamps();

            $table->foreign('ProtocolTestID')->references('ProtocolTestID')->on('ProtocolTests');
            $table->foreign('StudyID')->references('StudyID')->on('ProtocolStudies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('specifications');
    }
}
