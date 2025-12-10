import { Bell } from 'lucide-react';
import { SidebarTrigger } from '../sidebar/SidebarTrigger';
// import ProfileMenu from './ProfileMenu';
import { useSidebar } from '../sidebar/SidebarProvider';
// import { usePageMeta } from './usePageMeta';
// import { getUserName } from '../auth/jwt';

const Header = () => {
  const { isMobile } = useSidebar();
  // const { title, subtitle } = usePageMeta();
  // const userName = 'Jane Admin';

  return (
    <header className="w-full bg-white shadow border-b h-[73px] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {isMobile && <SidebarTrigger />}
        {/* {!isMobile && (
          <div>
            <h1 className="text-base font-semibold text-gray-800">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        )} */}
      </div>
      

      <div className="flex items-center gap-6">
        <div className="cursor-pointer hover:bg-gray-200 text-gray-600  transition p-2">
          <Bell size={18} />
        </div>
        {/* <ProfileMenu name={userName} /> */}
      </div>
    </header>
  );
};

export default Header;
