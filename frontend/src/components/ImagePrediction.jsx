import React, { useState, useRef } from "react";
import { Button } from "./ui/button.jsx";
import { Label } from "./ui/label.jsx";
import { Upload, Image as ImageIcon, X, Camera, Loader2 } from "lucide-react";
import { api } from "../api.js";
import { useToast } from "../hooks/use-toast";

const ImagePrediction = ({ onResult, onLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select a plant leaf image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    onLoading(true);

    // Simulate API call
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const { data } = await api.post("/image-prediction", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend Full Data:", data); //debugging

      const resultForDashboard = {
        ...data,
        type: "image",
        input: {
          fileName: selectedImage.name,
          fileSize: selectedImage.size,
          imagePreview: imagePreview,
        },
      };

      onResult(resultForDashboard);
      toast({
        title: "Analysis Complete",
        description: "Image-based prediction has been generated.",
      });

      handleRemoveImage();

    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      onLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col items-center justify-center space-y-1 text-center mb-6">
        <div className="bg-green-100/50 p-2.5 rounded-full mb-1">
          <Camera className="h-5 w-5 text-green-600" />
        </div>
        <h3 className="font-semibold text-gray-800 tracking-tight text-lg">Upload Leaf Image</h3>
        <p className="text-xs text-gray-500">Provide a clear photo for AI analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="imageUpload">Plant Leaf Photo</Label>

          <div className="relative mt-1 group flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-xl hover:border-green-400 hover:bg-green-50/30 transition-all duration-300 ease-in-out overflow-hidden">
            
            {imagePreview ? (
              <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <div className="relative rounded-lg shadow-sm border border-gray-100 overflow-hidden bg-white">
                  <img
                    src={imagePreview}
                    alt="Selected plant leaf"
                    className="h-32 object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-white/90 text-red-500 hover:bg-red-50 p-1.5 rounded-full shadow-sm hover:scale-105 transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                    {selectedImage.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {(selectedImage.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 mb-3 group-hover:scale-110 group-hover:bg-green-50 transition-all duration-300">
                  <ImageIcon className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
                </div>
                <p className="mb-1 text-sm text-gray-600 font-medium">
                  <span className="text-green-600 font-semibold group-hover:underline cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 mt-2 text-sm"
          disabled={!selectedImage || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Analyze Image
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ImagePrediction;
