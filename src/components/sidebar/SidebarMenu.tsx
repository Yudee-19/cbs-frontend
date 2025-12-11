import { useState } from 'react';
// import { getUserType } from '@/components/auth/jwt';
import { menuItems } from '@/constants/sidebar-routes';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from './SidebarProvider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';

export function SidebarMenu() {
  const { state, isMobile, openMobile } = useSidebar();
  const showLabels = state === 'expanded' || (isMobile && openMobile);
  const isCollapsed = !showLabels && !isMobile;
  const location = useLocation();
  // const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  // const userRole = getUserType();

  // if (!userRole) {
  //   console.error('User role is not available or invalid');
  //   navigate('/login');
  //   return <div>Error: User role is missing. Redirecting to login...</div>;
  // }

  // // Filter menu items by allowedRoles
  // const visibleMenuItems = menuItems.filter(
  //   (item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
  // );

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const wrapWithTooltip = (
    content: React.ReactNode,
    label: string,
    key?: string
  ) => {
    if (!isCollapsed) {
      return <div key={key}>{content}</div>;
    }
    return (
      <Tooltip key={key}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const isActive =
      location.pathname === item.path ||
      (item.path && location.pathname.startsWith(item.path + '/'));

    const isChildActive =
      item.children &&
      item.children.some(
        (child: any) =>
          location.pathname === child.path ||
          location.pathname.startsWith(child.path + '/')
      );

    const isOpen = openDropdowns.includes(item.label);

    if (item.children) {
      // Parent with children (dropdown)
      const button = (
        <button
          type="button"
          onClick={() => toggleDropdown(item.label)}
          className={`flex items-center w-full p-3 rounded-lg transition justify-between cursor-pointer
            ${
              isChildActive
                ? 'bg-primary text-white '
                : 'text-white hover:text-white hover:bg-primary/50'
            }
            ${isCollapsed ? 'justify-center' : 'gap-3'}
          `}
        >
          <div className="flex items-center gap-2 min-w-0 text-sm">
            {Icon && <Icon size={16} />}
            {showLabels && (
              <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm pl-1">
                {item.label}
              </span>
            )}
          </div>
          {showLabels && (
            <ChevronRight
              size={14}
              className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          )}
        </button>
      );

      return (
        <div key={item.label} className="mb-1">
          {wrapWithTooltip(button, item.label, item.label)}
          {!isCollapsed && isOpen && (
            <div className="mt-1 ">
              {item.children.map((child: any) => {
                const childIsActive =
                  location.pathname === child.path ||
                  location.pathname.startsWith(child.path + '/');
                const childLink = (
                  <NavLink
                    to={child.path}
                    className={`flex items-center rounded-lg transition cursor-pointer text-xs 
                      ${
                        childIsActive
                          ? 'text-white hover:bg-primary/50 bg-primary/50 '
                          : 'text-white hover:text-white hover:bg-primary/50 mt-1 mb-1'
                      }
                      ${isCollapsed ? 'justify-center' : 'gap-3'}
                    `}
                  >
                    <div className="flex items-center p-2 rounded-lg m-1 transition ml-7">
                      {child.icon && <child.icon size={14} />}
                      {showLabels && (
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis pl-1">
                          {child.label}
                        </span>
                      )}
                    </div>
                  </NavLink>
                );
                return wrapWithTooltip(childLink, child.label, child.path);
              })}
            </div>
          )}
        </div>
      );
    }

    // Normal item (no children)
    const link = (
      <NavLink
        to={item.path}
        className={`flex items-center p-3 rounded-lg mb-1 transition cursor-pointer
          ${
            isActive
              ? 'bg-primary text-white hover:bg-primary/50'
              : 'text-white hover:text-white hover:bg-primary/50'
          }
          ${isCollapsed ? 'justify-center' : 'gap-3'}
        `}
      >
        {Icon && <Icon size={16} />}
        {showLabels && (
          <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            {item.label}
          </span>
        )}
      </NavLink>
    );

    return wrapWithTooltip(link, item.label, item.path);
  };

  return (
    <nav className="flex flex-col p-2 bg-sidebar-primary ">
      <TooltipProvider delayDuration={200}>
        {menuItems.map((item: any) => renderMenuItem(item))}
      </TooltipProvider>
    </nav>
  );
}
