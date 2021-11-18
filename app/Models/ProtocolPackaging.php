<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProtocolPackaging extends Model
{
    use HasFactory;

    protected $table = "ProtocolPackagings";
    protected $guarded = [];

    public function primaryPackaging(): HasOne
    {
        return $this->hasOne(Packaging::class, 'PackagingID', 'Primary');
    }

    public function secondaryPackaging(): HasOne
    {
        return $this->hasOne(Packaging::class, 'PackagingID', 'Secondary');
    }

    public function tertiaryPackaging(): HasOne
    {
        return $this->hasOne(Packaging::class, 'PackagingID', 'Tertiary');
    }
}
