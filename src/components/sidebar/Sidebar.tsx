import { useSidebar } from './SidebarProvider';
import SidebarLogo from './SidebarLogo';
import { SidebarMenu } from './SidebarMenu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
// import { SidebarTrigger } from './SidebarTrigger';
// import { ShieldCheck } from 'lucide-react';
import ProfileMenu from '@/components/layouts/ProfileMenu';

type SidebarProps = {
  children?: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();
  const showLabels = state === 'expanded' || (isMobile && openMobile);
  const isCollapsed = !showLabels;

  // ───────────────────────── MOBILE (Sheet) ─────────────────────────
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className={cn(
            'w-[18rem] p-0 border-0 h-[100svh] flex flex-col text-xs bg-sidebar-primary',
            '[&>button]:hidden'
          )}
        >
          {/* Children (menu) scrollable */}
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  // ───────────────────────── DESKTOP ─────────────────────────
  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-white shadow-md border-r bg-sidebar-primary font-inter',
        state === 'expanded' ? 'w-64' : 'w-20'
      )}
    >
      <div className="px-0 border-b border-b-primary pb-2 pt-2">
        <SidebarLogo />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <SidebarMenu />
      </div>
      {/* <div
        className={cn(
          'flex items-center p-2',
          isCollapsed ? 'justify-center' : 'justify-end gap-3'
        )}
      >
        <SidebarTrigger />
      </div> */}

      {/* Admin Portal footer */}
      <div className="mx-2 mb-2 border-t border-t-primary">
        {/* ProfileMenu handles avatar image check + fallback */}
        <div className='pt-3'>
        <ProfileMenu
          name="Michael"
          email="micha@email.com"
          avatar="/images/avatar.jpg"
          isCollapsed={isCollapsed}
        />
        </div>
      </div>
    </aside>
  );
}
