<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'LaravelTEST') }}</title>
                {{-- <title inertia>Testing</title> --}}

        <!-- Fonts -->
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap');
        </style>
        {{-- <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <script src="https://kit.fontawesome.com/93227efa85.js" crossorigin="anonymous"></script>
    </body>
</html>
