import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      {children || <MainContent />}
    </div>
  );
};

export default Layout;