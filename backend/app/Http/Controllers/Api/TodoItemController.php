<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\TodoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoItemController extends Controller
{
    public function index()
    {
        $todoItems = TodoItem::all();
        return response()->json($todoItems);
    }

    public function show($id)
    {
        $todoItem = TodoItem::findOrFail($id);
        return response()->json($todoItem);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'nullable',
            'completed' => 'boolean',
        ]);
    
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(["error" => $errors], 400);
        }
    
        $todoItem = TodoItem::create($request->all());
    
        return response()->json($todoItem, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'completed' => 'boolean',
        ]);

        $todoItem = TodoItem::findOrFail($id);
        $todoItem->update($request->all());

        return response()->json($todoItem);
    }

    public function destroy($id)
    {
        $todoItem = TodoItem::findOrFail($id);
        $todoItem->delete();
    
        $remainingTodoItems = TodoItem::all();
    
        return response()->json($remainingTodoItems);
    }
}