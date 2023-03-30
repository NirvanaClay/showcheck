<?php

namespace App\Models;

use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    public $timestamps = false;
    public $fillable = ['title', 'image_url', 'imdb_id', 'show_type'];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_shows', 'user_id', 'show_id',)->withPivot('rating') ;
    }
}
