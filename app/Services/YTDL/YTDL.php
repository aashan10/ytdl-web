<?php

namespace App\Services\YTDL;


use App\Services\YTDL\Commands\DownloadVideo;
use App\Services\YTDL\Commands\VideoInfo;

class YTDL
{
    protected $downloadCommand;
    protected $infoCommand;
    public function __construct( DownloadVideo $downloadCommand, VideoInfo $infoCommand )
    {
        $this->downloadCommand = $downloadCommand;
        $this->infoCommand = $infoCommand;
    }

    public function getVideoInfo($videoKey){
        return $this->infoCommand->execute($videoKey);
    }

    public function downloadVideo($videoKey, $quality){
        $fileName = $this->downloadCommand->execute($videoKey, $quality);
        if( $fileName !== null){
            return $fileName;
        }
        return false;
    }
}