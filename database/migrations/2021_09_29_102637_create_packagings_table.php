<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackagingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Containers', function (Blueprint $table) {
            $table->id('ContainerID');
            $table->string('Name');
            $table->string('Source');
            $table->string('DMF');
            $table->text('Resin');
            $table->text('Colorant');
            $table->text('Liner');
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
        Schema::dropIfExists('packagings');
    }
}
