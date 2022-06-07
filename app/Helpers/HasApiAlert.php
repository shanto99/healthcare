<?php 

namespace App\Helpers;

trait HasApiAlert 
{
    protected function error(string $message, $data = [], int $status_code)
    {
        return response()->json([
            'isSuccess' => false,
            'error'     => $message,
            'data'      => $data
        ],$status_code);
    }

    protected function success($data_key, $data)
    {
        return response()->json([
            'isSuccess' => true,
            'data'      => [
                $data_key => $data
            ]
        ],200);
    }

    protected function notify(string $message)
    {
        return response()->json([
            'isSuccess' => true,
            'message'     => $message,
            'data'      => ''
        ],200);
    }
}