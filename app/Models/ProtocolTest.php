<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolTest extends Model
{
    use HasFactory;
    protected $table = "ProtocolTests";
    protected $primaryKey = "TestID";
    protected $guarded = [];
}
