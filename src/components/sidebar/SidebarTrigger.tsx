import { Menu, ChevronLeft,ChevronRight   } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from './SidebarProvider';

export function SidebarTrigger() {
  const { state, toggleSidebar, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu size={16} />
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      {state === 'expanded' ? (
        <div className="bg-white border border-gray-200 shadow-sm  hover:bg-gray-50 hover:border-primary  rounded-lg  p-1">
          <ChevronLeft className="w-4 h-4 " />
        </div>
      ) : (
        // Show X when expanded
        <div className="bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-primary transition-all duration-300 ease-in-out rounded-lg flex-shrink-0 p-1">
          {' '}
          <ChevronRight className="w-4 h-4" />
        </div>
        // Show menu icon when collapsed
      )}
    </Button>
  );
}
