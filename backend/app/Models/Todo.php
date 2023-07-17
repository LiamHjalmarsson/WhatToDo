<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory; // statment indicates that the model users a factory for fake generated data  

    protected $fillable = ["title", "description", "completed"];
    
    // public function user (): BelongsTo { // method that defines a relationship beteen the user and todo 
    //     // Ut spsificfies that each todo item belongs belogsto a user 
    //     return $this->belongsTo(User::class); // sets up the relationship 
    // }
}


// php artisan make:model Todo -m create the model 