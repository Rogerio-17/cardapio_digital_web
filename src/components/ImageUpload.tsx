"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Camera } from "lucide-react";

interface ImageUploadProps {
  label: string;
  type: "cover" | "profile";
  onImageChange: (file: File | null, preview: string) => void;
  preview?: string;
  className?: string;
}

export default function ImageUpload({ 
  label, 
  type, 
  onImageChange, 
  preview, 
  className = "" 
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      // Validar tamanho do arquivo (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("O arquivo deve ter no máximo 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null, "");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = () => {
    handleFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (type === "cover") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          <Camera className="inline w-4 h-4 mr-1" />
          {label}
        </label>
        
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <div
            onClick={openFileDialog}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              dragOver
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Upload className="w-12 h-12 mb-4" />
                <p className="text-sm font-medium">Clique ou arraste uma imagem aqui</p>
                <p className="text-xs mt-1">PNG, JPG até 5MB (1200x400px recomendado)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Profile image (circular)
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 text-center">
        <Camera className="inline w-4 h-4 mr-1" />
        {label}
      </label>
      
      <div className="flex justify-center">
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <div
            onClick={openFileDialog}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative w-32 h-32 border-2 border-dashed rounded-full cursor-pointer transition-all ${
              dragOver
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-full"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-xs text-center">Logo<br />200x200px</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
