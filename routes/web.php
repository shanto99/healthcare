<?php

use Illuminate\Support\Facades\Route;

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\ProductController;
// use App\Http\Controllers\ManufacturerController;
// use App\Http\Controllers\ApiDetailController;
// use App\Http\Controllers\BatchController;
// use App\Http\Controllers\MarketController;
// use App\Http\Controllers\ReceivedSampleController;
// use App\Http\Controllers\ContainerController;
// use App\Http\Controllers\StudyTypeController;
// use App\Http\Controllers\ConditionController;
// use App\Http\Controllers\ProtocolController;
// use App\Http\Controllers\PackagingController;
// use App\Http\Controllers\TestController;
// use App\Http\Controllers\ObservationController;
// use App\Http\Controllers\ReportController;

// /*
// |--------------------------------------------------------------------------
// | Web Routes
// |--------------------------------------------------------------------------
// |
// | Here is where you can register web routes for your application. These
// | routes are loaded by the RouteServiceProvider within a group which
// | contains the "web" middleware group. Now create something great!
// |
// */

// Route::get('/', function () {
//     return view('app');
// });
// Route::prefix('healthcare')->group(function () {
//     Route::post('/create_user', [UserController::class, 'create_user']);
//     Route::middleware('auth')->group(function () {

//         Route::get('/user', [UserController::class, 'get_user']);
//         Route::post('/create_product', [ProductController::class, 'save_product']);
//         Route::get('/products', [ProductController::class, 'get_products']);
        
//         Route::post('/create_api_detail', [ApiDetailController::class, 'create_api_detail']);
//         Route::get('/api_details', [ApiDetailController::class, 'get_api_details']);

//         Route::post('/save_received_sample', [ReceivedSampleController::class, 'save_received_sample']);
//         Route::get('/received_samples', [ReceivedSampleController::class, 'get_received_samples']);

//         Route::get('/packagings', [PackagingController::class, 'get_packagings']);
//         Route::post('/save_packaging', [PackagingController::class, 'save_packaging']);

//         Route::post('/save_test', [TestController::class, 'save_test']);

//         Route::get('/containers', [ContainerController::class, 'get_containers']);
//         Route::post('/save_container', [ContainerController::class, 'save_container']);

//         Route::post('/create_study_type', [StudyTypeController::class, 'create_study_type']);
//         Route::get('/get_study_types', [StudyTypeController::class, 'get_study_types']);

//         Route::post('/create_condition', [ConditionController::class, 'create_condition']);
//         Route::get('/all_conditions', [ConditionController::class, 'get_all_conditions']);

//         Route::post('/create_protocol', [ProtocolController::class, 'create_protocol']);
//         Route::get('/get_protocols', [ProtocolController::class, 'get_all_protocols']);

//         Route::get('/protocol_detail/{protocolId}', [ProtocolController::class, 'get_protocol_detail']);

//         Route::get('/get_parent_tests', [TestController::class, 'getParentTests']);
//         Route::get('/get_all_tests', [TestController::class, 'getAllTessts']);

//         Route::get('/get_sample_tests/{sampleId}', [ObservationController::class, 'getTests']);
//         Route::get('/get_sample_studies/{sampleId}', [ObservationController::class, 'getStudies']);

//         Route::get('/get_sample_observations/{sampleId}', [ObservationController::class, 'getObservations']);

//         Route::post('/submit_observations', [ObservationController::class, 'submitObservations']);
//         Route::get('/sample_variants/{sampleId}', [ObservationController::class, 'getSampleVariants']);

//         Route::post('/save_batch', [BatchController::class, 'saveBatch']);
//         Route::get('/get_sample_batches/{sampleId}', [BatchController::class, 'getSampleBatches']);

//         Route::get('/generate_obervation_report/{sampleId}/{studyId}/{batchId}', [ObservationController::class, 'generateObservationReport']);

//         Route::get('/generate_report', [ReportController::class, 'generateReport']);

//         Route::get('/get_counts/{sampleId}', [ObservationController::class, 'getCounts']);
//     });
// });


// Route::fallback(function () {
//     return redirect("/");
// });


Route::view('/{any?}', 'app');
Route::view('/{any?}/{any1?}', 'app');
Route::view('/{any?}/{any1?}/{any2?}', 'app');