<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProtocolTest extends Model
{
    use HasFactory;
    protected $table = "ProtocolTests";
    protected $primaryKey = "TestID";
    protected $guarded = [];

    public function counts(): HasMany
    {
        return $this->hasMany(TestCount::class, 'TestID', 'TestID');
    }
}
