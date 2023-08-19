<?php

use App\Http\Controllers\Api\TodoItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// ROUTE API RECOURSE METHOD
// it wont register the routes that are specific for displaying forms 
// only the routes that are respoinsibe for listing will be registed, showing one recourse and directly adding or modifying it witout the route for the forms 
Route::apiResource('todo-items', TodoItemController::class);

