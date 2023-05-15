<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_ending',
        'description',
        'status',
        'priority',
        'creator_id',
        'responsible_id'
    ];

    public function user() {
        return [$this->belongsTo(User::class, 'creator_id', 'id'),
               $this->belongsTo(User::class, 'responsible_id', 'id')];

    }
}
