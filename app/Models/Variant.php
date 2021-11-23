<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Variant extends Model
{
    use HasFactory;
    protected $table = "Variants";
    protected $primaryKey = "VariantID";

    protected $guarded = [];

    public function containers(): HasMany
    {
        return $this->hasMany(ProtocolContainer::class, 'VariantID', 'VariantID');
    }
}
