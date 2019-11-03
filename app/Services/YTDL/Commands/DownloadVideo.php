<?php

namespace App\Services\YTDL\Commands;

use App\Services\YTDL\Commands\Base\AbstractCommand;

class DownloadVideo extends AbstractCommand {
    protected $videoKey;
    protected $quality;
    protected $tempDirectory;


    public function __construct()
    {
        $this->tempDirectory = env('FILE_DOWNLOAD_LOCATION');
    }

    public function isAlreadyDownloaded(){
        $path = $this->tempDirectory
            .DIRECTORY_SEPARATOR
            .$this->videoKey
            .DIRECTORY_SEPARATOR
            .$this->quality
            .DIRECTORY_SEPARATOR;
        if(file_exists($path) && is_dir($path)){
            $files = array_diff(scandir($path, 1), ['..', '.']);
            if(count($files) > 0){
                return $files[0];
            }
        }
        return false;
    }

    public function execute($command, $quality = 'best')
    {
        $this->videoKey = $command;
        $this->quality = $quality;

        if($this->isAlreadyDownloaded() !== false){
            $this->output = $this->getFilePath($this->isAlreadyDownloaded());
            return $this->getOutput();
        }

        $outputUrl = $this->tempDirectory
            .DIRECTORY_SEPARATOR
            .$this->videoKey
            .DIRECTORY_SEPARATOR
            .$this->quality
            .DIRECTORY_SEPARATOR
            .'%(title)s.%(ext)s'; // Downloaded files are stored in temp directory.

        $command =  'youtube-dl -f bestaudio+'
                    . $quality
                    . ' https://youtube.com/watch?v='
                    . $command
                    . ' -o \''.$outputUrl.'\'';
        parent::execute($command);
        $file = $this->isAlreadyDownloaded();
        if($file !== false){
            $this->output = $this->getFilePath($file);
        }else{
            $this->output = null;
        }
        return $this->getOutput();
    }

    private function getFilePath($filename){
        return $this->tempDirectory
            .DIRECTORY_SEPARATOR
            .$this->videoKey
            .DIRECTORY_SEPARATOR
            .$this->quality
            .DIRECTORY_SEPARATOR
            .$filename;
    }

}