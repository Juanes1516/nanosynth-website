import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function UnifiedNavigation() {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: '/', label: 'Inicio' },
    { id: '/simulation', label: 'Simulación' },
    { id: '/manufacturing', label: 'Manufactura' },
    { id: '/analysis', label: 'Análisis' },
    { id: '/mathematical-models', label: 'Modelos Matemáticos', multiline: true },
    { id: '/experimental-characterization', label: 'Caracterización' },
    { id: '/authors', label: 'Equipo' }
  ];

  return (
    <nav className={`microflow-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">💧</div>
          <span>NanoSynth Labs</span>
        </Link>
        <ul className="nav-links">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Link 
                to={item.id}
                className={`${location.pathname === item.id ? 'active' : ''} ${item.multiline ? 'multiline' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/simulation" className="cta-button">
          Comenzar Proyecto
        </Link>
      </div>
    </nav>
  );
}
