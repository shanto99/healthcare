<?php

namespace App\Models;

use App\Helpers\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    use HasFactory, Searchable;

    protected $table = "Manufacturers";
    protected $primaryKey = "ManufacturerID";

    protected $guarded = [];
    
    protected $searchableColums = [
        'Name', 
        'Phone',
        'Email',
        'Address',
        'ManufacturerID'
    ];

    public function getManufacturer($request)
    {   
        $count = $this::all()->count();

        return $this::orderBy('ManufacturerID','desc')
                    ->search($this->searchableColums)
                    ->paginate($request->take == 'all' ? $count : $request->take);
    }

    public function createManufacturer($request) : Manufacturer
    {
        $this->Name = $request->Name;
        $this->Email = $request->Email;
        $this->Phone = $request->Phone;
        $this->Address = $request->Address;
        $this->save();

        return $this;
    }

    public function editManufacturer($manufacture, $request) : Manufacturer
    {
        $manufacture->update([
            'Name' => $request->Name,
            'Email' => $request->Email,
            'Phone' => $request->Phone,
            'Address' => $request->Address
        ]);

        return $this;
    }
}
