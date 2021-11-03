<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Illuminate\Http\Request;

class ContainerController extends Controller
{
    public function save_container(Request $request)
    {
        $request->validate([
           'Name' => 'required',
           'Source' => 'required'
        ]);

        $container = Container::create($request->only('Name', 'Source', 'DMF', 'Resin', 'Colorant', 'Liner'));

        return response()->json([
            'container' => $container,
            'status' => 200
        ], 200);

    }

    public function get_containers()
    {
        $containers = Container::all();
        return response()->json([
            'containers' => $containers,
        ], 200);
    }

}
