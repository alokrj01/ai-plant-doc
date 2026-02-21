import React from 'react';
import { Leaf, Heart, ChevronRight, Sprout } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Deep dark slate background for premium contrast
    <footer className="relative bg-slate-950 text-slate-200 pt-16 pb-8 overflow-hidden mt-auto">
      
      {/* Decorative Top Glow (Subtle Emerald glow at the top edge) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-12 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* --- MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section (Takes 5 columns on large screens) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-emerald-500/30 border-2 border-white/80 group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <Leaf className="h-5 w-5 text-white relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">PLANTMITRA AI</h3>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Disease Detection System</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Advanced AI-powered plant disease detection system. We empower gardeners and farmers to protect their crops with intelligent diagnosis and actionable treatment recommendations.
            </p>
          </div>

          {/* Features / Quick Links (Takes 3 columns) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6 lg:ml-auto">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-3">
              {['Text-based Analysis', 'Image Recognition', 'Treatment Plans', 'User-friendly UI'].map((item, i) => (
                <li key={i}>
                  {/* Smooth slide-in arrow on hover */}
                  <a href="#" className="group flex items-center text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-300">
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plant Care Tips (Takes 4 columns) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Plant Care Tips</h4>
            <ul className="space-y-4">
              {[
                'Regular monitoring prevents disease',
                'Proper watering reduces fungal issues',
                'Good air circulation is essential',
                'Early detection saves plants'
              ].map((item, i) => (
                <li key={i} className="flex items-start group">
                  <Sprout className="h-4 w-4 mr-3 text-emerald-500/70 shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm text-slate-300 leading-tight group-hover:text-slate-300 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- DIVIDER --- */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-slate-500">
          
          {/* Copyright */}
          <div className="flex items-center space-x-1">
            <span>© {currentYear}</span>
            <span className="text-slate-400 font-semibold">PLANTMITRA AI</span>
            <span>. All rights reserved.</span>
          </div>

          {/* Made with Love Badge */}
          <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700/80 shadow-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for plant lovers</span>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-10 text-center max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            <strong classname="text-slate-300">Disclaimer:</strong> PlantMitra AI uses advanced machine learning algorithms to provide disease predictions. 
            While highly accurate, it should not replace professional agricultural advice. Always consult with 
            certified agronomists or agricultural experts for severe plant health issues.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;