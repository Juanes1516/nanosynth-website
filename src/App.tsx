import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UnifiedNavigation } from './components/UnifiedNavigation';
import { NewHomePage } from './components/NewHomePage';
import { SimulationPage } from './components/SimulationPage';
import { ManufacturingPage } from './components/ManufacturingPage';
import { UnifiedAnalysisPage } from './components/UnifiedAnalysisPage';
import { MathematicalModelsPage } from './components/MathematicalModelsPage';
import { ExperimentalCharacterizationPage } from './components/ExperimentalCharacterizationPage';
import { AuthorsPage } from './components/AuthorsPage';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background">
      {/* Unified Navigation for all pages */}
      <UnifiedNavigation />
      
      <main className={isHomePage ? '' : 'pt-24'}>
        <Routes>
          <Route path="/" element={<NewHomePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/manufacturing" element={<ManufacturingPage />} />
          <Route path="/analysis" element={<UnifiedAnalysisPage />} />
          <Route path="/mathematical-models" element={<MathematicalModelsPage />} />
          <Route path="/experimental-characterization" element={<ExperimentalCharacterizationPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Routes>
      </main>
      
      {/* Footer - only show for non-home pages */}
      {!isHomePage && (
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
                  <a 
                    href="/simulation"
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Simulación
                  </a>
                  <a 
                    href="/manufacturing"
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Métodos de Manufactura
                  </a>
                  <a 
                    href="/analysis"
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Análisis de Datos
                  </a>
                  <a 
                    href="/authors"
                    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Equipo de Investigación
                  </a>
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

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}