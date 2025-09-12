import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Microscope, 
  BarChart3, 
  Activity, 
  Upload, 
  FileImage, 
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  Zap,
  ScatterChart
} from 'lucide-react';

// Importar los componentes de análisis existentes como submódulos
import { AnalysisPage } from './AnalysisPage';
import { StatisticalAnalysisPage } from './StatisticalAnalysisPage';
import { PIVAnalysisPage } from './PIVAnalysisPage';

export function UnifiedAnalysisPage() {
  const [activeAnalysis, setActiveAnalysis] = useState('microscopy');

  const analysisModules = [
    {
      id: 'microscopy',
      title: 'Análisis de Microscopía',
      description: 'Procesamiento automatizado de imágenes de microscopía',
      icon: <Microscope className="w-6 h-6" />,
      component: <AnalysisPage />
    },
    {
      id: 'statistical',
      title: 'Análisis Estadístico',
      description: 'Análisis estadístico completo de datos experimentales',
      icon: <BarChart3 className="w-6 h-6" />,
      component: <StatisticalAnalysisPage />
    },
    {
      id: 'piv',
      title: 'Análisis PIV',
      description: 'Particle Image Velocimetry para campos de velocidad',
      icon: <Activity className="w-6 h-6" />,
      component: <PIVAnalysisPage />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Centro de Análisis de Datos</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Suite completa de herramientas de análisis para datos microfluídicos. 
          Procese imágenes de microscopía, realice análisis estadísticos avanzados 
          y analice campos de velocidad con algoritmos de vanguardia.
        </p>
      </div>

      {/* Selector de Módulos de Análisis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="gradient-text">Módulos de Análisis Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysisModules.map((module) => (
              <Card
                key={module.id}
                className={`cursor-pointer transition-all duration-200 glass-card ${
                  activeAnalysis === module.id
                    ? 'ring-2 ring-cyan-400 bg-cyan-400/10'
                    : 'hover:bg-cyan-400/5'
                }`}
                onClick={() => setActiveAnalysis(module.id)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center text-accent">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  {activeAnalysis === module.id && (
                    <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300">
                      Activo
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contenido del Módulo Activo */}
      <div className="analysis-module-content">
        {analysisModules.find(module => module.id === activeAnalysis)?.component}
      </div>

      {/* Información Adicional */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Información de los Módulos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Microscope className="w-4 h-4 text-accent" />
                Análisis de Microscopía
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Procesamiento de imágenes JPG, PNG, TIFF</li>
                <li>• Análisis automatizado con IA</li>
                <li>• Métricas de calidad y uniformidad</li>
                <li>• Visualizaciones interactivas</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                Análisis Estadístico
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Carga de datos CSV</li>
                <li>• Estadísticas descriptivas completas</li>
                <li>• Análisis de distribución y correlación</li>
                <li>• Tests de normalidad</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                Análisis PIV
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Procesamiento de matrices PIV</li>
                <li>• Campos de velocidad y streamlines</li>
                <li>• Análisis de vorticidad</li>
                <li>• Métricas de calidad del flujo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
