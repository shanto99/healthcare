<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use HasFactory;
    protected $table = "Containers";
    protected $primaryKey = "ContainerID";

    protected $fillable = ['Name', 'Source', 'DMF', 'Resin', 'Colorant', 'Liner'];
}
