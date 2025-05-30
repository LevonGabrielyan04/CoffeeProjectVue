<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\History;
use App\Models\Product;
use Exception;

;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductPageController extends Controller
{
    private $pagination = 2;

    public function index() {
        $products = Product::paginate($this->pagination);
        $products->map(function ($product) {
            if(strlen($product->description) > 100) {
                $product->description = mb_substr($product->description , 0, 100)."...";
            }
            return $product;
          });
          $product_in_history = $this->get_histoty();
          $page_count = ceil(Product::count() / $this->pagination);
          $categories = Category::all();
          
        return json_encode(compact('products','product_in_history','page_count','categories'));
    }

    public function show_product(Request $request)//GET, not POST
    {
        $id = $request->id;
        $product = Product::find($id);
        $history_record = new History();
        if(Auth::id()){
            $history_record->user_id = Auth::id();
            $history_record->product_id = $id;
            $history_record->save();
        }
        $product_in_history = $this->get_histoty();
        return json_encode(compact('product','product_in_history'));
    }

    public function get_histoty(){
        try{
            $history = Auth::user()->history;
        }
        catch(Exception $e){
            return (object)[];
        }
        $product_in_history = $history->map(function ($el){
            return $el->product;
        });
        $product_in_history = $product_in_history->sortByDesc('created_at')->unique('id');
        return $product_in_history;
    }

    public function show_sorted(Request $request)//GET
    {
        return $this->sort($request->sort_type,'price');
    }

    public function show_sorted_by_date(Request $request)//GET
    {
        return $this->sort($request->sort_type,'created_at');
    }

    public function sort($sort_type,$type){ 
        $products = Product::orderBy($type, $sort_type)->get();
        $products->map(function ($product) {
            if(strlen($product->description) > 100) {
                $product->description = mb_substr($product->description , 0, 100)."...";
            }
            return $product;
          });
        return json_encode(compact('products')); 
    }

    public function filter_data(Request $request){//
        $data = $request->json()->all();
        $search_options = $data;        
        
        if(count($search_options) === 0)
            $products = $products = Product::paginate($this->pagination);
        else
            $products = Product::whereIn('category', $search_options)->paginate($this->pagination);
        $products->map(function ($product) {
            if(strlen($product->description) > 100) {
                $product->description = mb_substr($product->description , 0, 100)."...";
            }
            return $product;
          });
        return json_encode(compact('products'));
    }

    public function filter_data_by_price(Request $request){
        $data = $request->json()->all();
        $from = $data['from'];
        $to = $data['to'];

        $products = Product::whereBetween('price',[$from,$to])->get();

        $products->map(function ($product) {
            if(strlen($product->description) > 100) {
                $product->description = mb_substr($product->description , 0, 100)."...";
            }
            return $product;
          });

        return json_encode(compact('products'));
    }
}
