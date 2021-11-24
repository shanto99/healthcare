<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Protocol extends Model
{
    use HasFactory;

    protected $table = "Protocols";
    protected $guarded = [];

    protected $primaryKey = "ProtocolID";

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }

    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class, 'ManufacturerID', 'ManufacturerID');
    }

    public function market(): BelongsTo
    {
        return $this->belongsTo(Market::class, 'MarketID', 'MarketID');
    }

    public function stpReferences(): HasMany
    {
        return $this->hasMany(ProtocolStp::class, 'ProtocolID', 'ProtocolID');
    }

    public function api(): HasOne
    {
        return $this->hasOne(ApiDetail::class, 'ApiDetailID', 'ApiDetailID');
    }

    public function studyTypes(): HasMany
    {
        return $this->hasMany(ProtocolStudy::class, 'ProtocolID', 'ProtocolID');
    }

    public function tests(): HasMany
    {
        return $this->hasMany(ProtocolTest::class, 'ProtocolID', 'ProtocolID');
    }

//    public function containerCounts(): HasMany
//    {
//        return $this->hasMany(ContainerCount::class, 'ProtocolID', 'ProtocolID');
//    }

    public function containers(): HasMany
    {
        return $this->hasMany(ProtocolContainer::class, 'ProtocolID', 'ProtocolID');
    }
}
