<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoDownloader extends Controller
{
    public function index()
    {
        $url = 'https://www.youtube.com/watch?v=BWdpEGv2XXA';
        $videoId = $this->getVideoId($url);
        dd($videoId);
    }

    public function getVideoId($url)
    {
        parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
        return $my_array_of_vars['v'];
    }
}
