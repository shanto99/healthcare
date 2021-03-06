<?php

namespace App\Models;

use App\Helpers\Tokenable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Tokenable;

    protected $table = "UserManager";

    protected $primaryKey = "UserID";

    public $keyType = "string";

    protected $fillable = [
        'UserID',
        'UserName',
        'Password',
        'Phone'
    ];
    protected $hidden = [
        'Password',
        'remember_token'
    ];
}
