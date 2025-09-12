import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Inicio' },
    { id: 'simulation', label: 'Simulación' },
    { id: 'manufacturing', label: 'Métodos de Manufactura' },
    { id: 'analysis', label: 'Análisis de Datos' },
    { id: 'authors', label: 'Autores' }
  ];

  return (
    <nav className="sticky top-0 bg-primary shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-primary-foreground">
              NanoSynth
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary-foreground hover:bg-primary/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}