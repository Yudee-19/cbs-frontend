import { menuItems } from '@/constants/sidebar-routes';
import { useLocation } from 'react-router-dom';

export function usePageMeta() {
  const { pathname } = useLocation();

  // Helper: recursively search in menu and children
  const findCurrent = (items: any[]): any | undefined => {
    for (const item of items) {
      if (item.path && pathname.startsWith(item.path)) {
        return item;
      }
      if (item.children) {
        const child = findCurrent(item.children);
        if (child) return child;
      }
    }
    return undefined;
  };

  const current = findCurrent(menuItems);

  return {
    title: current?.title ?? current?.label ?? '',
    subtitle: current?.subtitle ?? '',
  };
}
