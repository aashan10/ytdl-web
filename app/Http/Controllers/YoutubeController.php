<?php

namespace App\Http\Controllers;


use App\Services\YTDL\YTDL;
use Illuminate\Http\Request;
use Exception;

class YoutubeController extends Controller
{
    protected $ytdl;

    public function __construct(YTDL $ytdl)
    {
        $this->ytdl = $ytdl;
    }

    public function getVideoDetails($videoKey){
        try{
            $videoInfo = $this->ytdl->getVideoInfo($videoKey);
            return response()->json([
                'status' => 'success',
                'video' => [
                    'quality' => $videoInfo
                ]
            ]);
        }catch(Exception $e){
            return response()->json([
               'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function downloadVideo(Request $request){
        $this->validate($request, [
            'videoKey' => 'required|string|size:11',
            'quality' => 'nullable|string'
        ]);
        $videoKey = $request->get('videoKey');
        $quality = $request->get('quality');
        if($quality == null ){
            $quality = 'best';
        }
        $fileName = $this->ytdl->downloadVideo($videoKey, $quality);
        if($fileName !== false){
            return response()->download($fileName);
        }
    }

}