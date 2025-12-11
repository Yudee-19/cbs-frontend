import { SidebarProvider } from '../sidebar/SidebarProvider';
import { Sidebar } from '../sidebar/Sidebar';
import { SidebarMenu } from '../sidebar/SidebarMenu';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen text-sm">
        <Sidebar>
          <SidebarMenu />
        </Sidebar>

        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <header className=" ">
            <Header />
          </header>

          <main className="flex-1 p-2 bg-gray-50 overflow-auto font-poppins">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
