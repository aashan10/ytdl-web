<?php

namespace App\Services\YTDL\Commands;

use App\Services\YTDL\Commands\Base\AbstractCommand;

class VideoInfo extends AbstractCommand {

    public function execute($command)
    {
        $command = 'youtube-dl -F https://youtube.com/watch?v='.$command;
        parent::execute($command);
        $this->output = explode(PHP_EOL, $this->output);
        return $this->filterOutput()->extractInfo()->getOutput();
    }

    public function extractInfo()
    {
        $q = [];
        foreach($this->output as $quality){
            if(is_string($quality) && strlen($quality) > 0){
                $str = str_replace(',', '', $quality);
                $str =  preg_replace('!\s+!', ' ', $quality);
                $str = explode(' ', $str);
                $q[] = [
                    'code' => $str[0],
                    'extension' => $str[1],
                    'type' => $str[2] === 'audio' ? 'audio' : 'video',
                    'quality' => $str[2] === 'audio' ? 'Audio' : $str[3],
                    'resolution' => $str[2] === 'audio' ? 'audio_only' : $str[2]
                ];
            }
        }
        $this->output = $q;
        return $this;

    }
    public function filterOutput()
    {
        $len = count($this->output);
        $filteredOutput = [];
        if($len > 3){
            for($i = 4; $i < $len; $i++){
                $filteredOutput[] = $this->output[$i];
            }
        }
        $this->output = $filteredOutput;
        return $this;
    }

    public function getOutput()
    {
        return $this->output;
    }

}