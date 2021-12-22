<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSampleBatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SampleBatches', function (Blueprint $table) {
            $table->id('SampleBatchID');
            $table->unsignedBigInteger('VariantID')->nullable();
            $table->string('BatchNo')->unique();
            $table->string('BatchSize');
            $table->date('MfgDate');
            $table->date('InitiationDate');
            $table->timestamps();

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
        Schema::dropIfExists('sample_batches');
    }
}
