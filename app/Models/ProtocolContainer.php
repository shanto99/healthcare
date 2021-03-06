<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\ValidatedInput;

class ProtocolContainer extends Model
{
    use HasFactory;
    protected $table = "ProtocolContainers";
    protected $primaryKey = "ProtocolContainerID";

    protected $guarded = [];

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'VariantID', 'VariantID');
    }

    public function primaryContainer(): BelongsTo
    {
        return $this->belongsTo(Container::class, 'Primary', 'ContainerID');
    }

    public function secondaryContainer(): BelongsTo
    {
        return $this->belongsTo(Container::class, 'Secondary', 'ContainerID');
    }

    public function tertiaryContainer()
    {
        return $this->belongsTo(Container::class, 'Tertiary', 'ContainerID');
    }
}
