import CL_logo from '@/assets/cbs_logo.png';
import CL_Icon from '@/assets/cbs_logo.png';
import { useSidebar } from './SidebarProvider';
import { SidebarTrigger } from './SidebarTrigger';
 
export default function SidebarLogo() {
  const sidebar = useSidebar() as any; // safe access to possibly-unknown props
  const { state, isMobile, openMobile } = sidebar || {};
 
  const showLabels = state === 'expanded' || (isMobile && openMobile);
   
  return (
    <div className="relative flex items-center justify-start gap-3 px-4 py-2 h-14">
      {/* Logo Box */}
      {!showLabels && (
        <div className="w-10 h-9 flex items-center justify-start">
            <img
              src={CL_Icon}
              alt="CBS Logo"
              className="h-9 w-auto object-contain rounded-lg block"
            />
        </div>
      )}
 
      {/* Text Section */}
      {showLabels && (
        <div className="flex-1 flex items-center justify-start" >
            <img
              src={CL_logo}
              alt="CBS Logo"
              className="h-11 w-auto object-contain rounded-lg block"
            
            />
        </div>
      )}
 
      {!isMobile && (
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <SidebarTrigger />
        </div>
      )}
    </div>
  );
}
