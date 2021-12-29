<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Tests', function (Blueprint $table) {
            $table->id('TestID');
            $table->string('Name');
            $table->string('Specifications')->nullable();
            $table->boolean('IsMinMax')->default(false);
            $table->string('Expression')->default(null);
            $table->string('DefaultValue')->default('N/A');
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
        Schema::dropIfExists('tests');
    }
}
