import React from 'react';
import CL_logo from '@/assets/cl_logo.png';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
 <div className="flex items-center space-x-3 pb-4">
            {/* Brand logo (keeps aspect ratio so text is readable) */}
            <a href="/" className="inline-flex items-center">
              <img
                src={CL_logo}
                alt="CARAT LOGIC — Gem & Diamond Management"
                className="block h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain shrink-0"
              />
            </a>
          </div>
          <p className="text-gray-400 mb-4 max-w-md">
            Professional inventory management solution for the gem and diamond
            industry, trusted by dealers worldwide.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CARAT LOGIC. All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                API
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Security
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
