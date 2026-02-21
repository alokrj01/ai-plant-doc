import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import TextPrediction from "./TextPrediction.jsx";
import ImagePrediction from "./ImagePrediction.jsx";
import Results from "./Results.jsx";
import Footer from "./Footer.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Separator } from "./ui/separator.jsx";
import { Sparkles } from "lucide-react";


const Dashboard = () => {
  const [predictionResults, setPredictionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictionResult = (apiResult) => {
    console.log("Dashboard received:", apiResult); //debugging
    const formattedResult = {
      ...apiResult,
      // Backend sends 'disease_name', mapping it to 'disease' for compatibility
      disease: apiResult.disease_name || apiResult.predicted_class || apiResult.Predicted_label || "Unknown",
      description: apiResult.description || "No description available.",
      treatment: apiResult.treatment || { immediate: [], prevention: [] },
      severity: apiResult.severity || "Unknown",
      confidence: apiResult.confidence, // format "98.50%" from backend
    };
    
    console.log("✅ FORMATTED DATA:", formattedResult); //debugging
    setPredictionResults(formattedResult);
  };

  const handleLoadingState = (loading) => {
    setIsLoading(loading);
  };

  return (
    // 1. App Layout: Full screen height, flexbox for sticky footer, soft gray background
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden text-slate-900">
      
      {/* 2. Ambient Background Glows (Premium Apple/Stripe Vibe) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300/20 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>

      <Navbar />

      {/* 3. Main Content Wrapper: flex-grow ensures footer stays at bottom */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        
        {/* --- HERO / WELCOME SECTION --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 shadow-sm text-green-700 text-sm font-bold tracking-wide mb-6">
            <Sparkles className="w-4 h-4 text-green-500" />
            AI-Powered Diagnostics
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Protect Your Plants with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Intelligent Vision
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Upload an image of a diseased leaf or describe the symptoms. Our advanced AI will instantly analyze the condition and provide a detailed treatment plan.
          </p>
        </div>

        {/* --- PREDICTION INPUTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
          
          {/* Text Prediction Card Container */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <TextPrediction
                onResult={handlePredictionResult}
                onLoading={handleLoadingState}
              />
            </CardContent>
          </Card>

          {/* Image Prediction Card Container */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <ImagePrediction
                onResult={handlePredictionResult}
                onLoading={handleLoadingState}
              />
            </CardContent>
          </Card>
        </div>

        {/* --- RESULTS SECTION --- */}
        {(predictionResults || isLoading) && (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
            
            {/* Elegant Divider Title */}
            <div className="flex items-center justify-center mb-10 opacity-80">
              <Separator className="w-1/4 sm:w-1/3 bg-slate-200" />
              <div className="px-4 sm:px-6 text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm">
                Analysis Report
              </div>
              <Separator className="w-1/4 sm:w-1/3 bg-slate-200" />
            </div>

            {/* Results Component (Directly rendered without extra outer card) */}
            <Results results={predictionResults} isLoading={isLoading} />
            
          </div>
        )}
      </main>

      {/* Footer handles its own dark background seamlessly */}
      <Footer />
    </div>
  );
};

export default Dashboard;
