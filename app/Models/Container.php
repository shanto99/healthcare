<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use HasFactory;
    protected $table = "Containers";

    public function packagings()
    {
        return $this->belongsToMany(Packaging::class, 'container_packaging', 'ContainerID', 'PackagingID');
    }
}
