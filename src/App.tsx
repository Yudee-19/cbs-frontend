import "./App.css";
// import DashboardLayout from "./components/layouts/DashboardLayout";
import { RouterProvider } from 'react-router-dom';
import { router } from "./routes/appRoutes";
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

export default App;
