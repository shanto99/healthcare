<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContainerCount extends Model
{
    use HasFactory;
    protected $table = "ContainerCounts";
    protected $primaryKey = "ContainerCountID";

    protected $guarded = [];
}
