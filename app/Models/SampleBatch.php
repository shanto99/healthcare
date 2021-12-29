<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleBatch extends Model
{
    use HasFactory;
    protected $table = "SampleBatches";
    protected $primaryKey = "SampleBatchID";
    protected $guarded = [];

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'VariantID', 'VariantID');
    }
}
