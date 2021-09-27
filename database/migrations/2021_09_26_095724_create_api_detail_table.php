<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApiDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ApiDetails', function (Blueprint $table) {

                $table->id('ApiDetailID');
                $table->string('Name');
                $table->string('Source')->default('');
                $table->string('BatchNo')->default('');
                $table->date('ExpireRetestDate')->nullable();
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
        Schema::dropIfExists('api_detail');
    }
}
