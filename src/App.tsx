
import React, { useState, useCallback} from 'react';
import { useAppState } from './Interfaces/GlobalTypes';
import { BrowserRouter} from "react-router-dom";

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SideMenu from './Components/SideMenu/SideMenu';

import App1 from './App1/App1';
import App2 from './App2/App2';
import './App.css'


const App: React.FC = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('app1');
  const appState = useAppState();

  const handleToggleSideMenu = useCallback(() => {
    setSideMenuOpen(prev => !prev);
  }, []);

  const handleNavigate = useCallback((route: string) => {
    setCurrentRoute(route);
    setSideMenuOpen(false);
  }, []);

  const renderContent = () => {
    switch (currentRoute) {
      case 'app2':
        return <App2 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <SideMenu
        isOpen={sideMenuOpen}
        onToggle={handleToggleSideMenu}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />
      <main className="flex-1">
            <BrowserRouter>
              <App1 appState={appState} />
            </BrowserRouter>
            {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
