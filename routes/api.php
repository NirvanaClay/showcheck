<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Laravel\Sanctum\Http\Controllers\Api\AuthController;

use App\Models\Show;
use App\Models\User;

use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;

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

// Auth::routes();

// Route::post('/auth/register', [AuthController::class, 'createUser']);
// Route::post('/auth/login', [AuthController::class, 'loginUser']);

// Route::post('/login', function() {
//     return "Testing login post route.";
// });

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::post('/login', function(Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $id = Auth::id();
        $user = User::find($id);
        return $user;
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
});

// Route::middleware('auth:sanctum')->get('/user', function() {
//     return "Fuck you";
// });

Route::middleware('auth:sanctum')->get('/userShows', function()
{
    $id = Auth::id();
    $user = User::find($id);
    if($user){
        return $user->shows;
    }
    else{
        return "There is not a user";
    }
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     // $user = $request->user();
//     // return $user;
//     return "Youza bitch";
//     // $id = Auth::id();
//     // $user = User::find($id);
//     // if($user){
//     //     return $user->shows;
//     // }
//     // else{
//     //     return "There is not a user";
//     // }
// });

// Route::get('/user', function (Request $request) {
//     $id = Auth::id();
//     $user = User::find($id);
//     return $user;
// });

// Route::get('/user', function() {
//     return "Should be user.";
// });

Route::post('/logout', function(Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('home');
});

// Route::get('/userShows', 'App\Http\Controllers\ShowController@userShows');

Route::get('/passwordReset', function() {
    return 'This should be view for password reset form.';
})->name('password.reset');

Route::post('/shows', 'App\Http\Controllers\ShowController@add');

Route::put('/shows/{id}', 'App\Http\Controllers\ShowController@edit');

Route::delete('/shows/{id}', 'App\Http\Controllers\ShowController@destroy');
