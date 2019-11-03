<?php
/**
 * Created by PhpStorm.
 * User: aashanghimire
 * Date: 10/28/19
 * Time: 9:13 AM
 */

namespace App\Services\YTDL\Commands\Base;


use App\Services\YTDL\Contracts\YTDLCommandInterface;

abstract class AbstractCommand implements YTDLCommandInterface
{
    protected $output;

    public function execute($command)
    {
        $this->output = shell_exec($command);
    }

    public function getOutput()
    {
        return $this->output;
    }


}