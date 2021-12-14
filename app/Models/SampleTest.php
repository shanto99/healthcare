<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleTest extends Model
{
    use HasFactory;
    protected $table = "SampleTests";
    protected $primaryKey = "SampleTestID";
}
