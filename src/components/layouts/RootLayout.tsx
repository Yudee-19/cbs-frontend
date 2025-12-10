import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

const RootLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackToLanding = () => {
    navigate('/'); // Navigate to home page
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onBackToLanding={handleBackToLanding}
      />
      <main className="flex-1 p-0">
        {/* The <Outlet /> component will render the content of the nested route */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
