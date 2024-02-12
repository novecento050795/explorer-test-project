<?php

namespace App\Http\Controllers;

use App\Http\Requests\File\IndexFileRequest;
use App\Http\Requests\File\UpdateFileRequest;
use App\Http\Requests\ShowFileRequest;
use App\Http\Requests\StoreFileRequest;
use App\Http\Resources\FileResource;
use App\Models\File;
use App\Services\FileService;

class FileController extends Controller
{
    public function index(IndexFileRequest $request) 
    {
        $search = $request->search;

        $files = File::when($request->search, function($fileQuery) use ($search) {
            $fileQuery->where('name', 'ilike', "%$search%");
        })->paginate(50);

        return FileResource::collection($files);
    }

    public function show(ShowFileRequest $request, File $file)
    {
        return $request->download 
            ? FileService::download($file) 
            : (new FileResource($file));
    }

    public function destroy(File $file)
    {
        FileService::delete($file);
        $file->delete();
        
        return response()->json([], 204);
    }

    public function store(StoreFileRequest $request)
    {
        $file = File::create(FileService::store($request->file('file'), $request->name));
        
        return new FileResource($file);
    }

    public function update(UpdateFileRequest $request, File $file)
    {
        $fileData = $request->file('file')
            ? FileService::restoreFile($file, $request->file('file'), $request->name) 
            : ['name' => $request->name !== $file->name ? FileService::rename($file, $request->name) : $file->name];
        $file->update($fileData);

        return new FileResource($file);
    }
}
