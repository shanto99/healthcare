<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContainerController extends Controller
{
    public function save_container(Request $request)
    {
        DB::beginTransaction();
        $packagingIds = $request->Packagings;
        try {
            $container = Container::create([
                'Name' => $request->Name,
                'Type' => $request->Type
            ]);
            foreach ($packagingIds as $packagingId) {
                $container->packagings()->attach($packagingId);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Could not create container',
                'status' => 500
            ], 500);
        }

        return response()->json([
            'message' => 'Container created successfully',
            'status' => 200
        ], 200);
    }

    public function get_containers()
    {
        $containers = Container::with('packagings')->get();
        return response()->json([
            'containers' => $containers
        ], 200);
    }
}
