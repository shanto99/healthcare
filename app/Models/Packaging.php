<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Packaging extends Model
{
    use HasFactory;
    protected $table = "Packgings";
    protected $primaryKey = "PackagingId";

    protected $fillable = ['Name', 'Source', 'DMF', 'Resin', 'Colorant', 'Liner'];
}
