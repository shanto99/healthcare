<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestCount extends Model
{
    use HasFactory;
    protected $table = "TestContainerCounts";

    protected $guarded = [];

    protected $primaryKey = "TestCountID";

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class, 'VariantID', 'VariantID');
    }
}
