<?php

namespace App\Models;

use App\Helpers\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory, Searchable;

    protected $table = "Markets";
    protected $primaryKey = "MarketID";

    protected $guarded = [];

    protected $searchableColums = [
        'MarketID', 
        'Name'
    ];

    public function getMarket($request)
    {   
        $count = $this::all()->count();

        return $this::orderBy('MarketID','desc')
                    ->search($this->searchableColums)
                    ->paginate($request->take == 'all' ? $count : $request->take);
    }

    public function createMarket($request) : Market
    {
        $this->Name = $request->Name;
        $this->save();

        return $this;
    }

    public function editMarket($market, $request) : Market
    {
        $market->update([
            'Name' => $request->Name
        ]);

        return $this;
    }
}
