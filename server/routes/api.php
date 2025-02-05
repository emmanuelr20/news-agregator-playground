<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::get('articles', [ArticleController::class, 'list']);
    Route::get('articles/{id}', [ArticleController::class, 'get']);
    Route::get('authors', [ArticleController::class, 'authors']);
    Route::get('sources', [ArticleController::class, 'sources']);
});
