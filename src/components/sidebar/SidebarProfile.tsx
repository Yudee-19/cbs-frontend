import { useSidebar } from './SidebarProvider';

export default function SidebarProfile() {
  const { state, isMobile, openMobile } = useSidebar();

  // Show labels only when expanded (desktop) or open (mobile drawer)
  const showLabels = state === 'expanded' || (isMobile && openMobile);

  return (
    <div className="mt-auto p-4 border-t text-xs">
      <div className="flex items-center gap-2">
        {/* Avatar - always visible */}
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">
          A
        </div>

        {/* Email + Role - visible only when expanded/open */}
        {showLabels && (
          <div className="transition-opacity duration-200 text-xs">
            <p className="font-medium">admin@caratlogic.com</p>
            <p className="text-gray-500">System Admin</p>
          </div>
        )}
      </div>
    </div>
  );
}
