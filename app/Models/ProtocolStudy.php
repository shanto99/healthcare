<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProtocolStudy extends Model
{
    use HasFactory;

    protected $table = 'ProtocolStudies';
    protected $primaryKey = 'StudyID';
    protected $guarded = [];

    public function condition(): BelongsTo
    {
        return $this->belongsTo(Condition::class, 'ConditionID', 'ConditionID');
    }

    public function studyType(): BelongsTo
    {
        return $this->belongsTo(StudyType::class, 'StudyTypeID', 'StudyTypeID');
    }
}
