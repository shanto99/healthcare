<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceivedSample extends Model
{
    use HasFactory;
    protected $table = "ReceivedSamples";
    protected $primaryKey = "AR";
    protected $keyType = "string";
    public $incrementing = false;

    protected $fillable = ['AR', 'ReceivingDate', 'ManufacturerID', 'ProductID', 'GRN', 'Batch', 'Remark'];


    public function product()
    {
        return $this->hasOne(Product::class, 'ProductID', 'ProductID');
    }

    public function manufacturer()
    {
        return $this->hasOne(Manufacturer::class, 'ManufacturerID', 'ManufacturerID');
    }

}
