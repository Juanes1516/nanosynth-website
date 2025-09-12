import React, { useEffect, useState } from 'react';

interface UnifiedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function UnifiedNavigation({ activeTab, onTabChange }: UnifiedNavigationProps) {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'simulation', label: 'Simulación' },
    { id: 'manufacturing', label: 'Manufactura' },
    { id: 'analysis', label: 'Análisis' },
    { id: 'mathematical-models', label: 'Modelos Matemáticos', multiline: true },
    { id: 'experimental-characterization', label: 'Caracterización' },
    { id: 'authors', label: 'Equipo' }
  ];

  return (
    <nav className={`microflow-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo" onClick={() => onTabChange('home')}>
          <div className="logo-icon">💧</div>
          <span>NanoSynth Labs</span>
        </div>
        <ul className="nav-links">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a 
                onClick={() => onTabChange(item.id)}
                className={`${activeTab === item.id ? 'active' : ''} ${item.multiline ? 'multiline' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="cta-button" onClick={() => onTabChange('simulation')}>
          Comenzar Proyecto
        </button>
      </div>
    </nav>
  );
}
