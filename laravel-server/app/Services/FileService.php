<?php
namespace App\Services;

use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileService
{
  public static function store($file, string $name = null): array 
  {
    $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
    $name = self::getUniqueFileName(
      $name ?: pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
      $extension
    );
        
    Storage::disk('local')->put(self::getFilePath($name, $extension), file_get_contents($file));
    return [
      'type'      => $file->getMimeType(),
      'size'      => $file->getSize(),
      'name'      => $name,
      'extension' => $extension
    ];
  }

  public static function download(File $file)
  {
    return Storage::download(self::getFilePath($file->name, $file->extension), $file->name);
  }

  public static function delete(File $file): bool
  {
    return Storage::disk('local')->delete(self::getFilePath($file->name, $file->extension));
  }

  public static function getUniqueFileName(string $name, string $extension): string
  {
    if (Storage::disk('local')->exists(self::getFilePath($name, $extension))) {
      $name = self::getUniqueFileName("$name(1)", $extension);
    }
    return $name;
  }

  public static function restoreFile(File $fileModel, $file, string $name): array
  {
    self::delete($fileModel);
    return self::store($file, $name);
  }

  private static function getFilePath(string $name, string $extension): string
  {
    return "files/$name" . ($extension ? ".$extension" : "");
  }

  public static function rename(File $file, string $name): string
  {
    $name = FileService::getUniqueFileName($name, $file->extension);
    Storage::move(
      self::getFilePath($file->name, $file->extension), 
      self::getFilePath(
        $name,
        $file->extension
      )
    );
    return $name;
  }
  
}