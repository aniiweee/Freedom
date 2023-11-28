<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductStoreRequest;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; 


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();

        return response()->json([
            'products' => $products
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        try{
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
            $user = User::find($request->user_id);
            $user->products()->create([
                'name' => $request->name,
                'price' => $request->price,
                'image' => $imageName,
                'description' => $request->description
            ]);
            Storage::disk('public')->put($imageName, file_get_contents($request->image));
            return response()->json([
                'message' => "Product successfully created."
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        $product = Product::find($id);
       if(!$product){
         return response()->json([
            'message'=>'Product Not Found.'
         ],404);
       }
      
       return response()->json([
          'product' => $product
       ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductStoreRequest $request, $id)
    {
        try {
            $product = Product::find($id);
            if(!$product){
              return response()->json([
                'message'=>'Product Not Found.'
              ],404);
            }
      
            $product->user_id = $request->user_id;
            $product->name = $request->name;
            $product->price = $request->price;
            $product->description = $request->description;
      
            if($request->image) {
 
                $storage = Storage::disk('public');
      
                if($storage->exists($product->image))
                    $storage->delete($product->image);
      
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $product->image = $imageName;
      
                $storage->put($imageName, file_get_contents($request->image));
            }
      
            $product->save();
      
            return response()->json([
                'message' => "Product successfully updated."
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if(!$product){
          return response()->json([
             'message'=>'Product Not Found.'
          ],404);
        }
      
        $storage = Storage::disk('public');
      
        if($storage->exists($product->image))
            $storage->delete($product->image);
      
        $product->delete();
      
        return response()->json([
            'message' => "Product successfully deleted."
        ],200);
    }
}
