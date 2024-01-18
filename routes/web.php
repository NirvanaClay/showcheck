<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

use Illuminate\Support\Facades\Http;

// use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
// use Laravel\Sanctum\Http\Controllers\Api\AuthController;

// use App\Models\Show;
use App\Models\User;

use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;

use Inertia\Inertia;

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

Route::get(`/`, function () {
    return Inertia::render('Main');
});

Route::get('/searchShows', function(Request $request){
    $showType = $request->query('showType');
    $searchQuery = $request->query('query');
    $apiKey = env('SEARCH_API_KEY');
    $url = "https://tv-api.com/en/API/Search${showType}/$apiKey/$searchQuery";
    try {
        $response = Http::get($url);
        return $response->json();
    } 
    catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch data from the IMDb API: ' . $e->getMessage()], 500);
    }
});

Route::post('/register', function(Request $request) {
    $request->validate([
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);
    $csrfToken = csrf_token();
    return $csrfToken;
});

Route::post('/login', function(Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $id = Auth::id();
        $user = User::find($id);
        Auth::login($user);
        $csrfToken = csrf_token();
        return $csrfToken;
    }
    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
});

Route::get('/checkLogin', function (Request $request) {
    return Auth::check();
});

Route::get('/user', function (Request $request) {
    if(Auth::check()){
        $user = Auth::user();
        return $user;
    }
    else{
        return false;
    }
})->middleware('auth');

Route::get('/userShows', function()
{
    $id = Auth::id();
    $user = User::find($id);
    if($user){
        return $user->shows;
    }
    else{
        return "There is not a user";
}});

Route::post('/shows', 'App\Http\Controllers\ShowController@add')->middleware(['auth.basic']);
;

Route::put('/shows/{id}', 'App\Http\Controllers\ShowController@edit')->middleware(['auth.basic']);

Route::delete('/shows/{id}', 'App\Http\Controllers\ShowController@destroy')->middleware(['auth.basic']);

Route::post('/logout', function(Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    // return redirect('/');
});

// Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
// ->name('password.request');

Route::post('/reset-password', function(Request $request): RedirectResponse
{
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);
    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user) use ($request) {
            $user->forceFill([
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(60),
            ])->save();
    
            event(new PasswordReset($user));
        }
    );     
    if ($status == Password::PASSWORD_RESET) {
        return redirect()->route('login')->with('status', __($status));
    }

    throw ValidationException::withMessages([
        'email' => [trans($status)],
    ]);
});

Route::get('{any}', function () {
    return Inertia::render('Main', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});

require __DIR__.'/auth.php';
