<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiDetail extends Model
{
    use HasFactory;

    protected $table = "ApiDetails";
    protected $primaryKey = "ApiDetailID";

    protected $guarded = [];
}
