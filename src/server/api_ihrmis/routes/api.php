<?php

use App\Http\Controllers\Applicant\TblapplicantChildrenController;
use App\Http\Controllers\Applicant\TblapplicantCseligibilitiesController;
use App\Http\Controllers\Applicant\TblapplicantDeclarationController;
use App\Http\Controllers\Applicant\TblapplicantEducationsController;
use App\Http\Controllers\Applicant\TblapplicantExperiencesController;
use App\Http\Controllers\Applicant\TblapplicantOtherInfoController;
use App\Http\Controllers\Applicant\TblapplicantProfileController;
use App\Http\Controllers\Applicant\TblapplicantReferencesController;
use App\Http\Controllers\Applicant\TblapplicantRequirementsController;
use App\Http\Controllers\Applicant\TblapplicantTrainingsController;
use App\Http\Controllers\Applicant\TblapplicantVoluntaryController;
use App\Http\Controllers\JvscrwMainController;
use App\Http\Controllers\TblofficesController;
use App\Http\Controllers\TblplantillaItemsController;
use App\Http\Controllers\TblpositionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//=======================================================================================
// APPLICANT ENDPOINTS
//=======================================================================================
Route::post('new-applicant/{id?}', [TblapplicantProfileController::class, "createApplicant"]);
Route::post('new-afc/{id}', [TblapplicantProfileController::class, "createFamilyChildren"]);
Route::get('verify-email', [TblapplicantProfileController::class, "verifyEmail"]);
Route::get('get-new-applicant/{id}',[TblapplicantProfileController::class, "getApplicant"]);
Route::get('get-new-family/{id}',[TblapplicantProfileController::class, "getFamilyChildren"]);
//crud-child
Route::get('new-children/{id}',[TblapplicantChildrenController::class, "getChildrenRecord"]);
Route::post('new-children/{id}',[TblapplicantChildrenController::class, "addChildrenRecord"]);
Route::delete('new-children/{id}',[TblapplicantChildrenController::class, "removeChildrenRecord"]);
//crud-educ
Route::post('new-education/{id}', [TblapplicantEducationsController::class, "addEducationRecord"]);
Route::get('new-education/{id}', [TblapplicantEducationsController::class, "getEducationRecord"]);
Route::delete('new-education/{id}', [TblapplicantEducationsController::class, "removeEducationRecord"]);
//crud-csc
Route::get('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "getCseligibilityRecord"]);
Route::post('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "addCseligibilityRecord"]);
Route::delete('new-csc-eleigibility/{id}', [TblapplicantCseligibilitiesController::class, "removeCseligibilityRecord"]);
//crud-exp
Route::get('new-work-experience/{id}', [TblapplicantExperiencesController::class, "getExperienceRecord"]);
Route::post('new-work-experience/{id}', [TblapplicantExperiencesController::class, "addExperienceRecord"]);
Route::delete('new-work-experience/{id}', [TblapplicantExperiencesController::class, "removeExperienceRecord"]);
//crud-vol
Route::get('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "getVoluntaryRecord"]);
Route::post('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "addVoluntaryRecord"]);
Route::delete('new-voluntary-work/{id}', [TblapplicantVoluntaryController::class, "removeVoluntaryRecord"]);
//crud-trn
Route::get('new-training/{id}', [TblapplicantTrainingsController::class, "getTrainingRecord"]);
Route::post('new-training/{id}', [TblapplicantTrainingsController::class, "addTrainingRecord"]);
Route::delete('new-training/{id}', [TblapplicantTrainingsController::class, "removeTrainingRecord"]);
//crud-otr
Route::get('new-other-info/{id}', [TblapplicantOtherInfoController::class, "getOtherInfoRecord"]);
Route::post('new-other-info/{id}', [TblapplicantOtherInfoController::class, "addOtherInfoRecord"]);
Route::delete('new-other-info/{id}', [TblapplicantOtherInfoController::class, "removeOtherInfoRecord"]);
//crud-ref
Route::get('new-reference/{id}', [TblapplicantReferencesController::class, "getReferenceRecord"]);
Route::post('new-reference/{id}', [TblapplicantReferencesController::class, "addReferenceRecord"]);
Route::delete('new-reference/{id}', [TblapplicantReferencesController::class, "removeReferenceRecord"]);

//Info
Route::get('new-get-delcaration/{id}', [TblapplicantDeclarationController::class, "getDataDeclaration"]);
Route::post('new-declaration/{id}', [TblapplicantDeclarationController::class, "onSubmitDecleration"]);

//GOVERNMENT ID
Route::post('new-profile/{id}', [TblapplicantProfileController::class, "addGovernmentId"]);
Route::post('new-profile-image/{id}', [TblapplicantProfileController::class, "addimage"]);

Route::post('new-requirement/{id}', [TblapplicantRequirementsController::class, "addDocuments"]);

//=======================================================================================
// JVSCRW ENDPOINTS
//=======================================================================================
Route::post('jvscrw/{id}', [JvscrwMainController::class, "writeJvs"]);
Route::get('jvscrw/{id}', [JvscrwMainController::class, "show"]);


// Route::resource('jvscrw/{id}', JvscrwMainController::class);
// Route::get('competency/{jvs_id}', [JvsCompetencyController::class, "updateCompetency"]);

Route::get('office-position', [TblplantillaItemsController::class, "officePosition"]);
Route::resource('plantilla-items', TblplantillaItemsController::class);
Route::resource('offices', TblofficesController::class);
Route::resource('positions', TblpositionsController::class);
Route::resource('positions-csc-std', TblpositionsController::class);