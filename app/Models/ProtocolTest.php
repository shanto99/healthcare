<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProtocolTest extends Model
{
    use HasFactory;
    protected $table = "ProtocolTests";
    protected $primaryKey = "ProtocolTestID";
    protected $guarded = [];

    public function counts(): HasMany
    {
        return $this->hasMany(TestCount::class, 'ProtocolTestID', 'ProtocolTestID');
    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'TestID', 'TestID');
    }

    public function subTest()
    {
        return $this->belongsTo(SubTest::class, 'SubTestID', 'SubTestID');
    }

    public function specifications()
    {
        return $this->hasMany(TestSpecification::class, 'ProtocolTestID', 'ProtocolTestID');
    }
}
