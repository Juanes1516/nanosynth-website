import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Printer, Zap, Settings, Download, FileCode, Box, FileText, Loader2, AlertCircle } from 'lucide-react';
import { generateDesign, SimulationResponse } from '../services/api';

export function SimulationPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [kinetics, setKinetics] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [simulationResults, setSimulationResults] = useState<SimulationResponse | null>(null);

  const manufacturingMethods = [
    {
      id: 'printing',
      name: 'Impresión 3D',
      icon: <Printer className="w-6 h-6" />,
      fullName: 'Impresión 3D por Resina'
    },
    {
      id: 'laser',
      name: 'Ablación Láser',
      icon: <Zap className="w-6 h-6" />,
      fullName: 'Ablación Láser'
    },
    {
      id: 'cnc',
      name: 'CNC',
      icon: <Settings className="w-6 h-6" />,
      fullName: 'Mecanizado CNC'
    }
  ];

  // Función para manejar la generación de diseño
  const handleGenerate = async () => {
    if (!selectedMethod || !kinetics.trim()) {
      setError('Por favor seleccione un método de manufactura e ingrese la cinética de la reacción.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSimulationResults(null);

    try {
      // Obtener el nombre completo del método seleccionado
      const method = manufacturingMethods.find(m => m.id === selectedMethod);
      const methodName = method ? method.fullName : selectedMethod;

      // Llamada a la API simulada
      const response = await generateDesign({
        method: methodName,
        kinetics: kinetics.trim()
      });

      setSimulationResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado durante la generación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Generador de Diseño Microfluídico</h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Automatice el diseño de dispositivos microfluídicos para la síntesis de nanomateriales 
          utilizando algoritmos avanzados de optimización y simulación computacional.
        </p>
      </div>

      <Card className="mb-6 glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Settings className="w-5 h-5" />
            Seleccionar Método de Manufactura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {manufacturingMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 glass-card ${
                  selectedMethod === method.id
                    ? 'ring-2 ring-cyan-400 bg-cyan-400/10'
                    : 'hover:bg-cyan-400/5'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    {method.icon}
                    <span className="font-medium text-white">{method.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <FileCode className="w-5 h-5" />
            Cinética de la Reacción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Ingrese los parámetros de cinética de la reacción (ej: velocidad de flujo, concentraciones, temperatura, etc.)"
              value={kinetics}
              onChange={(e) => setKinetics(e.target.value)}
              className="min-h-32 mb-2"
            />
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
              ¿Necesita ayuda? Consulte nuestro asistente IA
            </button>
          </div>


        </CardContent>
      </Card>

      {/* Mensaje de Error */}
      {error && (
        <Alert variant="destructive" className="glass-card">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Botón de Generación */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={!selectedMethod || !kinetics.trim() || isLoading}
          className="btn-primary px-8 py-3"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generando Diseño...
            </>
          ) : (
            'Generar Diseño'
          )}
        </Button>
      </div>

      {/* Resultados */}
      {simulationResults && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center">Sus archivos están listos para descargar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {simulationResults.files.map((file, index) => {
                // Determinar el ícono y descripción basado en el nombre del archivo
                const getFileInfo = (fileName: string) => {
                  if (fileName.includes('.CAD')) {
                    return {
                      icon: <Box className="w-5 h-5" />,
                      extension: '.CAD',
                      description: 'Archivo de geometría 3D para manufactura'
                    };
                  } else if (fileName.includes('.java')) {
                    return {
                      icon: <FileCode className="w-5 h-5" />,
                      extension: '.java',
                      description: 'Código de simulación computacional'
                    };
                  } else if (fileName.includes('.pdf')) {
                    return {
                      icon: <FileText className="w-5 h-5" />,
                      extension: '.pdf',
                      description: 'Especificaciones técnicas de fabricación'
                    };
                  }
                  return {
                    icon: <FileText className="w-5 h-5" />,
                    extension: '',
                    description: 'Archivo generado'
                  };
                };

                const fileInfo = getFileInfo(file.name);
                
                return (
                  <div key={index} className="border border-border rounded-lg p-6 text-center space-y-4">
                    <div className="flex justify-center text-accent">
                      {fileInfo.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{file.name.replace(/\s*\([^)]*\)$/, '')}</h4>
                      {fileInfo.extension && (
                        <Badge variant="secondary" className="mt-1">
                          {fileInfo.extension}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {fileInfo.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        if (!file.url || file.url === '#') {
                          alert('Descarga no disponible en modo demostración.');
                          return;
                        }
                        window.open(file.url, '_blank');
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}