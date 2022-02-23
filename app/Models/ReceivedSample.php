<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceivedSample extends Model
{
    use HasFactory;
    protected $table = "ReceivedSamples";
    protected $primaryKey = "SampleID";
    protected $keyType = "string";
    public $incrementing = false;

    protected $fillable = ['SampleID', 'ReceivingDate', 'ManufacturerID', 'ProductID', 'GRN', 'Batch', 'Remark', 'ProtocolID'];


    public function product()
    {
        return $this->hasOne(Product::class, 'ProductID', 'ProductID');
    }

    public function manufacturer()
    {
        return $this->hasOne(Manufacturer::class, 'ManufacturerID', 'ManufacturerID');
    }

    public function protocol()
    {
        return $this->belongsTo(Protocol::class, 'ProtocolID', 'ProtocolID');
    }

    public function tests()
    {
        return $this->hasMany(SampleTest::class, 'SampleID', 'SampleID');
    }

    public function batches()
    {
        return $this->hasMany(SampleBatch::class, 'SampleID', 'SampleID');
    }

    public function testsForBatchStudy($studyId, $batchId)
    {
        return $this->tests()->where('StudyID', $studyId)->where('SampleBatchID', $batchId)->get();
    }
}
