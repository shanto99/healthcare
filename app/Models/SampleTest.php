<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleTest extends Model
{
    use HasFactory;
    protected $table = "SampleTests";
    protected $primaryKey = "SampleTestID";

    protected $guarded = [];

    public function protocolTest()
    {
        return $this->belongsTo(ProtocolTest::class, 'ProtocolTestID', 'ProtocolTestID');
    }
}
