<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_show extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $fillable = ['user_id', 'show_id', 'rating'];
}
