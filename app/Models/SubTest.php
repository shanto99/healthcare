<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTest extends Model
{
    use HasFactory;
    protected $table = "SubTests";
    protected $primaryKey = "SubTestID";

    protected $guarded = [];
}
