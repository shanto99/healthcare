<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubTest;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Test extends Model
{
    use HasFactory;
    protected $table = "Tests";
    protected $primaryKey = "TestID";

    protected $guarded = [];

    public function subTests(): HasMany
    {
        return $this->hasMany(SubTest::class, 'TestID', 'TestID');
    }
}
