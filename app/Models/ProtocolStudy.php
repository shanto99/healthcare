<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtocolStudy extends Model
{
    use HasFactory;

    protected $table = 'ProtocolStudies';
    protected $primaryKey = 'StudyID';
    protected $guarded = [];
}
