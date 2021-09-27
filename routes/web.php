<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ApiDetailController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\ReceivedSampleController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/create_user', [UserController::class, 'create_user']);
Route::post('/sign_in', [UserController::class, 'sign_in']);
Route::middleware('auth')->group(function() {
    Route::get('/user', [UserController::class, 'get_user']);
    Route::post('/create_product', [ProductController::class, 'save_product']);
    Route::get('/products', [ProductController::class, 'get_products']);
    Route::post('/logout', [UserController::class, 'sign_out']);
    Route::post('/create_manufacturer', [ManufacturerController::class, 'create_manufacturer']);
    Route::get('/manufacturers', [ManufacturerController::class, 'get_manufacturers']);

    Route::post('/create_market', [MarketController::class, 'create_market']);
    Route::get('/markets', [MarketController::class, 'get_markets']);

    Route::post('/create_api_detail', [ApiDetailController::class, 'create_api_detail']);
    Route::get('/api_details', [ApiDetailController::class, 'get_api_details']);

    Route::post('/save_received_sample', [ReceivedSampleController::class, 'save_received_sample']);
    Route::get('/received_samples', [ReceivedSampleController::class, 'get_received_samples']);
});

Route::fallback(function() {
    return view('app');
});
