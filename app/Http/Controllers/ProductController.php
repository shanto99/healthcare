<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function save_product(Request $request)
    {
        $request->validate([
            'ProductName' => 'required',
            'Variants' => 'required'
        ]);

        $variants = $request->Variants;

        $product = Product::create($request->only('ProductName'));

        foreach ($variants as $variant) {
            Variant::create([
                'Variant' => $variant,
                'ProductID' => $product->ProductID
            ]);
        }

        return response()->json([
            'product' => $product,
            'status' => 200
        ], 200);

    }

    public function get_products()
    {
        $products = Product::with('variants')->get();
        return response()->json([
            'products' => $products,
            'status' => 200
        ], 200);
    }
}
