import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import CL_logo from '@/assets/cl_logo.png';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onBackToLanding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  onBackToLanding,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleButtonClick = () => {
    if (isHomePage) {
      navigate('/login');
    } else {
      onBackToLanding();
    }
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {/* Brand logo (keeps aspect ratio so text is readable) */}
            <a href="/" className="inline-flex items-center">
              <img
                src={CL_logo}
                alt="CARAT LOGIC — Gem & Diamond Management"
                className="block h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain shrink-0"
              />
            </a>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </a>
            <Button
              variant={isHomePage ? 'default' : 'outline'}
              onClick={handleButtonClick}
              className={isHomePage ? 'bg-primary hover:bg-hover' : ''}
            >
              {isHomePage ? 'Login' : 'Back to Home'}
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary py-2"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-primary py-2"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-primary py-2"
              >
                Testimonials
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-primary py-2"
              >
                About
              </a>
              <div className="pt-2">
                <Button
                  variant={isHomePage ? 'default' : 'outline'}
                  onClick={handleButtonClick}
                  className={`w-full ${
                    isHomePage ? 'bg-primary hover:bg-hover' : ''
                  }`}
                >
                  {isHomePage ? 'Login' : 'Back to Home'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
