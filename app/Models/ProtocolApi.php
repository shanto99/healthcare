<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolApi extends Model
{
    use HasFactory;
    protected $table = "ProtocolApi";

    public $timestamps = false;

    protected $guarded = [];
}
