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

const SimPage = lazy(() => import('@/pages/it/Sim/Simpage'));

const HardwareTransferPage = lazy(() => import('@/pages/it/HardwareTansfer/HardwareTansferPage'));
const LandBuildingPage = lazy(() => import('@/pages/assets/LandBuilding/LandBuildingPage'));
const VehiclePage = lazy(() => import('@/pages/assets/Vechicle/VechiclePage'));
const EquipmentPage = lazy(() => import('@/pages/assets/Equipment/EquipmentPage'));
const FurniturePage = lazy(() => import('@/pages/assets/Furniture/FurniturePages'));
const LicensePage = lazy(() => import('@/pages/company-document/license/LicensePage'));
const LegalDocumentPage = lazy(() => import('@/pages/company-document/legal-document/LegalDocumentPage'));
const AduitReportPage = lazy(() => import('@/pages/company-document/aduit-report/AduitReportPage'));
const ISOCertificationsPage = lazy(() => import('@/pages/company-document/iso-certifications/ISOCertificationsPage'));
const ChequePrintingPage = lazy(()=> import('@/pages/banking/ChequePrintingPage'));
const NewChequePage = lazy(()=> import('@/pages/banking/NewChequePage'));
const ChequeManagerPage = lazy(()=> import('@/pages/banking/ChequeManagerPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path:'/', element: <Navigate to="/dashboard" replace />
      },
      { path: '/dashboard', element: <div>Dashboard Content</div> },
      {
        path: 'assets', element: <Navigate to="/assets/land-building" replace />,
      },
      
      {
        path : '/my-attendance', element: <div>My Attendance Page</div>
      },
      {
        path : '/leave-application', element: <div>Leave Application Page</div>
      },
      {
        path :'/banking', element: <Navigate to="/banking/cheque-printing" replace />
      },
      {
        path : '/banking/cheque-printing',
        element: 
        (
          <Suspense fallback={<LoadingFallback />}>
            <ChequePrintingPage />
          </Suspense>
        )
      },
      {
        path : '/banking/cheque-printing/new-cheque',
        element: 
        (
          <Suspense fallback={<LoadingFallback />}>
            <NewChequePage />
          </Suspense>
        )
      },
      {
        path : '/banking/cheque-printing/cheque-manager',
        element: 
        (
          <Suspense fallback={<LoadingFallback />}>
            <ChequeManagerPage />
          </Suspense>
        )
      },
      {
        path: '/assets/vehicle',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VehiclePage />
          </Suspense>
        )
      },
      {
        path: '/assets/land-building', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LandBuildingPage />
          </Suspense>
        ),
      },
      {
        path: '/assets/equipment', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EquipmentPage />
          </Suspense>
        ),
      },
      {
        path: '/assets/furniture', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FurniturePage />
          </Suspense>
        ),
      },
      {
        path: '/docs/licence', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LicensePage />
          </Suspense>
        ),
      },
      {
        path:'docs', element: <Navigate to="/docs/licence" replace />,
      },
      {
        path: '/docs/legal-docs', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LegalDocumentPage />
          </Suspense>
        ),
      },
     
       {
        path: '/docs/iso', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ISOCertificationsPage />
          </Suspense>
        ),
      },
      {
        path: '/docs/audit', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AduitReportPage />
          </Suspense>
        ),
      },
      {
        path: 'it', element: <Navigate to="/it/hardware" replace />,
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
      {
        path: 'it/sim-management', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            {/* <ItSupport /> */}
            <SimPage />
          </Suspense>
        ),
      },
      {
        path: 'it/hardware-transfer', // becomes /it/software
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HardwareTransferPage />
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