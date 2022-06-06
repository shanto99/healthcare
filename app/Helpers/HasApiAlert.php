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

    protected function success($message, $data)
    {
        return response()->json([
           'isSuccess'         => true,
           'message'           => $message,
           'data'              => $data
        ], 200);
    }
}