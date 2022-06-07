<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManufacturerCreateRequest as CreateRequest;
use App\Models\Manufacturer;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function index(Manufacturer $manufacturer, Request $request)
    {
        $manufacturer = $manufacturer->getManufacturer($request);

        return $this->success('manufacturers', $manufacturer);
    }

    public function store(Manufacturer $manufacturer, CreateRequest $request)
    {
        $manufacturer->createManufacturer($request);

        return $this->notify('Manufacturer created successfully!');
    }

    public function show(Manufacturer $manufacturer)
    {
        return $this->success('manufacturer', $manufacturer);
    }

    public function edit(Manufacturer $manufacturer, Request $request)
    {   
        $manufacturer->editManufacturer($manufacturer,$request);

        return $this->notify('Manufacturer updated successfully!');
    }

    public function delete(Manufacturer $manufacturer)
    {   
        $manufacturer->delete();

        return $this->notify('Manufacturer deleted successfully!');
    }
}
