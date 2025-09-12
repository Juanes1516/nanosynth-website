import React, { useState } from 'react';
import { UnifiedNavigation } from './components/UnifiedNavigation';
import { NewHomePage } from './components/NewHomePage';
import { SimulationPage } from './components/SimulationPage';
import { ManufacturingPage } from './components/ManufacturingPage';
import { UnifiedAnalysisPage } from './components/UnifiedAnalysisPage';
import { MathematicalModelsPage } from './components/MathematicalModelsPage';
import { ExperimentalCharacterizationPage } from './components/ExperimentalCharacterizationPage';
import { AuthorsPage } from './components/AuthorsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <NewHomePage onNavigate={setActiveTab} />;
      case 'simulation':
        return <SimulationPage />;
      case 'manufacturing':
        return <ManufacturingPage />;
      case 'analysis':
        return <UnifiedAnalysisPage />;
      case 'mathematical-models':
        return <MathematicalModelsPage />;
      case 'experimental-characterization':
        return <ExperimentalCharacterizationPage />;
      case 'authors':
        return <AuthorsPage />;
      default:
        return <NewHomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Unified Navigation for all pages */}
      <UnifiedNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={activeTab === 'home' ? '' : 'pt-24'}>
        {renderPage()}
      </main>
      
      {/* Footer - only show for non-home pages */}
      {activeTab !== 'home' && (
        <footer className="bg-primary text-primary-foreground py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">NanoSynth</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  Plataforma académica para el diseño automatizado de dispositivos microfluídicos 
                  para la síntesis de nanomateriales de alta precisión.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Enlaces Rápidos</h4>
                <nav className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('simulation')}
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Simulación
                  </button>
                  <button 
                    onClick={() => setActiveTab('manufacturing')}
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Métodos de Manufactura
                  </button>
                  <button 
                    onClick={() => setActiveTab('analysis')}
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Análisis de Datos
                  </button>
                  <button 
                    onClick={() => setActiveTab('authors')}
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Equipo de Investigación
                  </button>
                </nav>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Contacto</h4>
                <div className="space-y-2 text-sm text-primary-foreground/80">
                  <p>nanosynth@research.edu</p>
                  <p>+1 (555) 123-4567</p>
                  <p className="mt-4">
                    © 2024 NanoSynth Technologies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}