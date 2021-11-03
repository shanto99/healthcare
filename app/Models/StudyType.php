<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyType extends Model
{
    use HasFactory;

    protected $table = "StudyTypes";
    protected $primaryKey = "StudyTypeID";

    protected $fillable = ["StudyName", "StudyMonths"];


}
