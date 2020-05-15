<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFwRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fw_rules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('record_id')->comment("Resource ID on Cloudflare");
            $table->string('action');
            $table->string('status');
            $table->text('description')->nullable();
         
            $table->integer('zone_id');
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
        Schema::dropIfExists('fw_rules');
    }
}
