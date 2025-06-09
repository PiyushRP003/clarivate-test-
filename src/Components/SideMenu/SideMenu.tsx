import React from 'react';
import './SideMenu.scss';

interface SideMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onToggle, currentRoute, onNavigate }) => (
  <>
    <button 
      onClick={onToggle}
      className="side-menu-toggle"
    >
      SideMenu
    </button>

    <div className={`side-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="menu-content">
        <h2>Navigation</h2>
        <nav>
          <button
            onClick={() => onNavigate('app1')}
            className={currentRoute.startsWith('app1') ? 'active' : ''}
          >
            <span>App 1 - Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('app2')}
            className={currentRoute === 'app2' ? 'active' : ''}
          >
            <span>App 2 - Placeholder</span>
          </button>
        </nav>
      </div>
    </div>

    {isOpen && (
      <div 
        className="backdrop"
        onClick={onToggle}
      />
    )}
  </>
);

export default SideMenu;
