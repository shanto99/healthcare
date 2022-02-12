<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestSpecification extends Model
{
    use HasFactory;
    protected $table = "TestSpecifications";
    protected $primaryKey = "TestSpecificationID";

    protected $guarded = [];
}
