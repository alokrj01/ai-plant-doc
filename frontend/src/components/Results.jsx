import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Progress } from './ui/progress.jsx';
import { Separator } from './ui/separator.jsx';
import { 
  CheckCircle, AlertTriangle, Info, FileText, 
  Image as ImageIcon, Activity, ShieldAlert, Pill, Leaf 
} from 'lucide-react';

const Results = ({ results, isLoading }) => {
  const resultsRef = useRef(null);

  // Smooth scroll to results when they appear
  useEffect(() => {
    if (results && !isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results, isLoading]);

  // Helper to convert "98.50%" string to 98.5 number
  const getNumericConfidence = (conf) => {
    if (!conf) return 0;
    if (typeof conf === 'number') return conf;
    if (typeof conf === 'string') {
      return parseFloat(conf.replace('%', ''));
    }
    return 0;
  };

  // Used for Progress bar and logic
  const confidenceValue = getNumericConfidence(results?.confidence);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
          <Leaf className="absolute inset-0 m-auto text-green-600 animate-pulse" size={24} />
        </div>
        <p className="text-lg font-medium text-green-800 animate-pulse">AI is analyzing plant data...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12 px-4 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <Activity className="h-8 w-8 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">No predictions yet.</p>
        <p className="text-sm">Use text or image prediction above to get started.</p>
      </div>
    );
  }

  // Determine vibes based on healthy vs diseased
  const isHealthy = results.disease?.toLowerCase().includes('healthy');
  
  const getConfidenceVariant = (val) => {
    if (val >= 85) return 'success';
    if (val >= 60) return 'warning';
    return 'destructive';
  };

  const getProgressColor = (val) => {
    if (val >= 85) return 'green';
    if (val >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div ref={resultsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* --- SECTION 1: AI DIAGNOSIS HEADER --- */}
      <Card className={`overflow-hidden border-0 shadow-xl ${isHealthy ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className={`h-2 w-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className={`w-5 h-5 ${isHealthy ? 'text-green-600' : 'text-red-500'}`} />
                <span className="text-sm font-bold tracking-wider uppercase text-gray-500">Official Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {results.disease}
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {results.severity && !isHealthy && (
                  <Badge variant="destructive" className="px-3 py-1 text-sm shadow-sm">
                    {results.severity} Severity
                  </Badge>
                )}
                {isHealthy && (
                  <Badge variant="success" className="px-3 py-1 text-sm shadow-sm">
                    Perfectly Healthy
                  </Badge>
                )}
              </div>
            </div>

            {/* Confidence Score Block */}
            <div className="w-full md:w-auto bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50 min-w-[220px]">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-gray-500">AI Confidence</span>
                <span className={`text-3xl font-black leading-none ${confidenceValue >= 85 ? 'text-green-600' : confidenceValue >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {results.confidence}
                </span>
              </div>
              {/* USING NEW PROGRESS COMPONENT */}
              <Progress value={confidenceValue} color={getProgressColor(confidenceValue)} />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: DESCRIPTION & CONTEXT --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Description takes 2/3 of the space on desktop */}
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
              <ShieldAlert className="w-5 h-5 text-blue-600" />
              About the Condition
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
              {results.description || "No specific details available for this condition."}
            </p>
          </CardContent>
        </Card>

        {/* Input Summary takes 1/3 of the space on desktop */}
        <Card className="shadow-md bg-slate-50 border-slate-200 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3 border-b border-slate-200">
            <CardTitle className="text-base flex items-center gap-2 text-slate-700">
              {results.type === 'text' ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
              Analysis Context
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm">
            {results.type === 'text' ? (
              <div className="space-y-3">
                <div>
                  <span className="block text-slate-500 font-medium text-xs uppercase mb-1">Plant Type</span>
                  <span className="text-slate-800 font-semibold">{results.input.plantType}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-medium text-xs uppercase mb-1">Symptoms</span>
                  <span className="text-slate-800">{results.input.symptoms}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {results.input.imagePreview && (
                  <img
                    src={results.input.imagePreview}
                    alt="Analyzed plant"
                    className="w-full h-32 object-cover rounded-xl border border-slate-200 shadow-sm"
                  />
                )}
                <div className="flex justify-between items-center text-slate-600">
                  <span className="truncate max-w-[150px]" title={results.input.fileName}>{results.input.fileName}</span>
                  <Badge variant="default" className="bg-slate-200 text-slate-700 border-none">
                    {(results.input.fileSize / 1024).toFixed(1)} KB
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- SECTION 3: TREATMENT RECOMMENDATIONS --- */}
      {!isHealthy && results.treatment && (
        <Card className="shadow-lg border-green-100 overflow-hidden">
          <CardHeader className="bg-green-50/50 border-b border-green-100">
            <CardTitle className="text-xl text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Treatment Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Responsive Grid for Treatments */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              
              {/* Immediate Actions */}
              <div className="p-6 md:p-8 space-y-4 bg-white hover:bg-red-50/30 transition-colors duration-500">
                <h4 className="font-bold text-red-700 flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5" /> Immediate Actions
                </h4>
                <ul className="space-y-3">
                  {/* Added optional chaining (?.) to prevent crashes */}
                  {results.treatment?.immediate?.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-red-100 p-1 rounded-full shrink-0">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-sm">{action}</span>
                    </li>
                  )) || <li className="text-gray-400 italic text-sm">No immediate actions available.</li>}
                </ul>
              </div>
              
              {/* Long-term Prevention */}
              <div className="p-6 md:p-8 space-y-4 bg-white hover:bg-blue-50/30 transition-colors duration-500">
                <h4 className="font-bold text-blue-700 flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5" /> Long-term Prevention
                </h4>
                <ul className="space-y-3">
                  {results.treatment?.prevention?.map((prevention, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 p-1 rounded-full shrink-0">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-sm">{prevention}</span>
                    </li>
                  )) || <li className="text-gray-400 italic text-sm">No prevention strategies available.</li>}
                </ul>
              </div>

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Results;