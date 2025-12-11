import { Loader2 } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

const HardwarePage = lazy(
  () => import('@/pages/it/Hardware/HardwarePage')
);

const DashboardLayout = lazy(
  () => import('@/components/layouts/DashboardLayout')
);

const SoftwarePage = lazy(
  () => import('@/pages/it/software/SoftwarePages')
);

const Equipment = lazy(
  () => import('@/pages/it/Equipment/EquipmentPage')
);

const ItSupport = lazy(
    () => import('@/pages/it/itSupport/ItSupportPage')
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {path: '/dashboard', element: <div>Dashboard Content</div> },
      {
        path:'it' , element: <Navigate to="/it/hardware" replace />,
      },
      {
        path: 'it/hardware', // becomes /it/hardware
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HardwarePage />
          </Suspense>
        ),
      },
      {
        path: 'it/software-license', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SoftwarePage />
          </Suspense>
        ),
      },
      {
        path: 'it/network-equipment', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Equipment />
          </Suspense>
        ),
      },
       {
        path: 'it/support', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ItSupport />
          </Suspense>
        ),
      },
    ],
  },
  // optional: keep /dashboard working as redirect to root
//   {
//     path: '/dashboard',
//     element: <Navigate to="/" replace />,
//   },
]);