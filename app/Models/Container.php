<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Container extends Model
{
    use HasFactory;
    protected $table = "Containers";
    protected $primaryKey = "ContainerID";

    protected $fillable = ['Name', 'Type'];

    public function packagings(): BelongsToMany
    {
        return $this->belongsToMany(Packaging::class, 'container_packaging', 'ContainerID', 'PackagingID');
    }
}
