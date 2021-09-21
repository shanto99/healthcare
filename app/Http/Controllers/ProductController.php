<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function save_product(Request $request)
    {
        $request->validate([
            'ProductName' => 'required'
        ]);

        $product = Product::create($request->only('ProductName'));

        return response()->json([
            'product' => $product,
            'status' => 200
        ], 200);

    }

    public function get_products()
    {
        $products = Product::all();
        return response()->json([
            'products' => $products,
            'status' => 200
        ], 200);
    }
}
