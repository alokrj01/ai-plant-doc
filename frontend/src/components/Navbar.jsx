import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Leaf, LogOut, User } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName') || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    navigate('/');
  };

  return (
    // Responsive padding added to the main nav wrapper
    <nav className="sticky top-0 z-50 w-full pt-2 sm:pt-4 px-2 sm:px-4 pb-2">
      
      {/* Reduced padding on mobile (px-3 py-2) vs desktop (sm:px-5 sm:py-3) */}
      <div className="mx-auto max-w-5xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
          
          {/* Logo icon smaller on mobile (w-8 h-8) and normal on desktop (sm:w-11 sm:h-11) */}
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-emerald-500/30 border-2 border-white/80 group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
            <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-white relative z-10" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Typography Section */}
          <div className="flex flex-col justify-center">
            {/* Title smaller on mobile (text-base) */}
            <span className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight leading-none mb-0.5 group-hover:text-green-700 transition-colors duration-300">
              PlantMitra AI
            </span>
            {/* MAGIC FIX: Subtitle hidden on mobile, block on medium screens and up */}
            <span className="hidden md:block text-[10px] font-bold text-green-600 uppercase tracking-wider">
              Advanced Plant Disease Detection
            </span>
          </div>
        </Link>

        {/* User / Action Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {isAuthenticated ? (
            <>
              {/* User Profile Pill */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-50/80 border border-gray-100 px-3 py-1.5 rounded-full">
                <div className="bg-green-100 p-1 rounded-full">
                  <User className="h-3.5 w-3.5 text-green-700" />
                </div>
                <span className="text-sm font-semibold text-gray-700 tracking-wide">{userName}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Button with whitespace-nowrap to prevent text breaking */}
              <Link 
                to="/login" 
                className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              
              {/* Get Started Button responsive sizing */}
              <Link to="/register">
                <Button className="h-8 px-3 text-xs sm:h-10 sm:px-6 sm:text-sm whitespace-nowrap">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;