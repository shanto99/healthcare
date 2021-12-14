<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ApiDetailController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\ReceivedSampleController;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\StudyTypeController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\ProtocolController;
use App\Http\Controllers\PackagingController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ObservationController;
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
Route::middleware('auth')->group(function () {
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

    Route::get('/packagings', [PackagingController::class, 'get_packagings']);
    Route::post('/save_packaging', [PackagingController::class, 'save_packaging']);

    Route::post('/save_test', [TestController::class, 'save_test']);

    Route::get('/containers', [ContainerController::class, 'get_containers']);
    Route::post('/save_container', [ContainerController::class, 'save_container']);

    Route::post('/create_study_type', [StudyTypeController::class, 'create_study_type']);
    Route::get('/get_study_types', [StudyTypeController::class, 'get_study_types']);

    Route::post('/create_condition', [ConditionController::class, 'create_condition']);
    Route::get('/all_conditions', [ConditionController::class, 'get_all_conditions']);

    Route::post('/create_protocol', [ProtocolController::class, 'create_protocol']);
    Route::get('/get_protocols', [ProtocolController::class, 'get_all_protocols']);

    Route::get('/protocol_detail/{protocolId}', [ProtocolController::class, 'get_protocol_detail']);

    Route::get('/get_parent_tests', [TestController::class, 'getParentTests']);
    Route::get('/get_all_tests', [TestController::class, 'getAllTessts']);

    Route::get('/get_sample_tests/{sampleId}', [ObservationController::class, 'getTests']);
    Route::get('/get_sample_studies/{sampleId}', [ObservationController::class, 'getStudies']);
});

Route::fallback(function () {
    return view('app');
});
