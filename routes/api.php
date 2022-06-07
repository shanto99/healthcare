<?php

//Route::get('/overdue-tasks','Backend\TasksController@overdueTasks');

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Admin\MarketController;
use App\Http\Controllers\API\Admin\ManufacturerController;

Route::post('login',[AuthController::class,'login'])->name('login');

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('logout', [AuthController::class, 'logout']);

    //Manufacturer
    Route::get('/manufacturers', [ManufacturerController::class, 'index']);
    Route::post('/manufacturer/create', [ManufacturerController::class, 'store']);
    Route::get('/manufacturer/{manufacturer}', [ManufacturerController::class, 'show']);
    Route::post('/manufacturer/{manufacturer}', [ManufacturerController::class, 'edit']);
    Route::post('/manufacturer/delete/{manufacturer}', [ManufacturerController::class, 'delete']);

    //Market
    Route::get('/markets', [MarketController::class, 'index']);
    Route::post('/market/create', [MarketController::class, 'store']);
    Route::get('/market/{market}', [MarketController::class, 'show']);
    Route::post('/market/{market}', [MarketController::class, 'edit']);
    Route::post('/market/delete/{market}', [MarketController::class, 'delete']);


});
