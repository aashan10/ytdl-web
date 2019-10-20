<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/downloadVideo/{video}', function ( string $video ) {
    return [
      'status' => 'success',
      'video' => [
          'identifier' => $video,
          'quality' => [
              '720p', '1080p', '4K', '360p'
          ]
      ]
    ];
});