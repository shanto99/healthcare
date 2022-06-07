<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MarketCreateRequest;
use App\Models\Market;
use Illuminate\Http\Request;

class MarketController extends Controller
{
    public function index(Market $market, Request $request)
    {
        $market = $market->getMarket($request);

        return $this->success('markets', $market);
    }

    public function store(Market $market, MarketCreateRequest $request)
    {
        $market->createMarket($request);

        return $this->notify('Market created successfully!');
    }

    public function show(Market $market)
    {
        return $this->success('market', $market);
    }

    public function edit(Market $market, Request $request)
    {
        $market->editMarket($market,$request);

        return $this->notify('Market updated successfully!');
    }

    public function delete(Market $market)
    {
        $market->delete();

        return $this->notify('Market deleted successfully!');
    }
}
