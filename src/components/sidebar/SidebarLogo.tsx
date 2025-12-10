import  { useState } from 'react';
import CL_logo from '@/assets/cbs_logo.png';
import CL_Icon from '@/assets/cbs_logo.png';
import { useSidebar } from './SidebarProvider';
import { SidebarTrigger } from './SidebarTrigger';
 
export default function SidebarLogo() {
  const sidebar = useSidebar() as any; // safe access to possibly-unknown props
  const { state, isMobile, openMobile } = sidebar || {};
 
  const showLabels = state === 'expanded' || (isMobile && openMobile);
 
  const [smallImgError, setSmallImgError] = useState(false);
  const [fullImgError, setFullImgError] = useState(false);
 
  // SidebarTrigger handles toggling via SidebarProvider
   
  return (
    <div className="relative flex items-center gap-3 px-4 py-2 h-14">
      {/* Logo Box */}
      {!showLabels && (
        <div className="w-10 h-9">
          {!smallImgError ? (
            <img
              src={CL_Icon}
              alt="CBS Logo"
              className="w-full h-11 object-contain rounded-lg"
              onError={() => setSmallImgError(true)}
            />
          ) : (
            /* simple inline SVG fallback so layout stays consistent */
            <svg className="w-full h-11" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CBS">
              <rect width="48" height="48" rx="8" fill="#0f172a" />
              <circle cx="24" cy="24" r="10" fill="#1e40af" />
              <path d="M17 31 L31 17" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </div>
      )}
 
      {/* Text Section */}
      {showLabels && (
        <div className="flex-1">
          {!fullImgError ? (
            <img
              src={CL_logo}
              alt="CBS Logo"
              className="w-full h-11 object-contain rounded-lg"
              onError={() => setFullImgError(true)}
            />
          ) : (
            <div className="w-full h-11 flex items-center">
              <svg className="w-32 h-9" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CBS">
                <rect width="160" height="40" rx="6" fill="#0f172a" />
                <text x="50%" y="50%" fill="#fff" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontFamily="sans-serif">CBS</text>
              </svg>
            </div>
          )}
        </div>
      )}
 
      {/* Collapse/expand control (desktop only) - use SidebarTrigger */}
      {!isMobile && (
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <SidebarTrigger />
        </div>
      )}
    </div>
  );
}
