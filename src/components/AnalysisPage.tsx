import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload, FileImage, BarChart3, ScatterChart, Download, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart as RechartsScatter, Scatter } from 'recharts';
import { analyzeImage, AnalysisResponse } from '../services/api';

export function AnalysisPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);

  // Función para manejar la carga de archivos por drag & drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Función para procesar el archivo cargado
  const handleFileUpload = async (file: File) => {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
    if (!allowedTypes.includes(file.type)) {
      setError('Formato de archivo no soportado. Use JPG, PNG o TIFF.');
      return;
    }

    // Validar tamaño de archivo (50MB máximo)
    if (file.size > 50 * 1024 * 1024) {
      setError('El archivo es demasiado grande. Tamaño máximo: 50MB.');
      return;
    }

    setUploadedFile(file);
    setError('');
    setIsLoading(true);
    setAnalysisResults(null);

    try {
      // Llamada a la API simulada
      const response = await analyzeImage(file);
      setAnalysisResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado durante el análisis.');
      setUploadedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar la selección de archivos por input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Generar datos de visualización basados en los resultados
  const generateVisualizationData = () => {
    if (!analysisResults) return { mixingData: [], statisticsData: [] };

    const mixingLevel = analysisResults.results.mixingLevel;
    const mixingData = [
      { region: 'Entrada', nivel: Math.max(mixingLevel - 15, 60), std: 12 },
      { region: 'Mezcla 1', nivel: Math.max(mixingLevel - 8, 70), std: 8 },
      { region: 'Mezcla 2', nivel: Math.max(mixingLevel - 5, 75), std: 15 },
      { region: 'Confluencia', nivel: mixingLevel, std: 5 },
      { region: 'Salida', nivel: Math.min(mixingLevel + 3, 100), std: 3 }
    ];

    const statisticsData = analysisResults.results.statisticalMetrics.map((metric, index) => ({
      x: 20 + index * 15 + Math.random() * 10,
      y: metric.value,
      size: 80 + Math.random() * 100
    }));

    return { mixingData, statisticsData };
  };

  const { mixingData, statisticsData } = generateVisualizationData();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Análisis de Datos de Microscopía</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Procese y analice imágenes de microscopía para evaluar la calidad y eficiencia de sus dispositivos microfluídicos. 
          Nuestro sistema utiliza algoritmos avanzados de visión por computadora para proporcionar métricas precisas.
        </p>
      </div>

      {/* Paso 1: Carga de Archivo */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="gradient-text">Paso 1: Carga de Imagen</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mensaje de Error */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragOver 
                ? 'border-accent bg-accent/10' 
                : 'border-border hover:border-accent/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {!uploadedFile ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="mb-2">Arrastre su imagen aquí</h3>
                  <p className="text-muted-foreground mb-4">
                    o haga clic para seleccionar un archivo
                  </p>
                  <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                    <FileImage className="w-4 h-4 mr-2" />
                    Seleccionar Imagen
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    accept=".jpg,.jpeg,.png,.tiff,.tif"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Formatos soportados: JPG, PNG, TIFF (máx. 50MB)
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <FileImage className="w-6 h-6 text-accent" />
                  <span className="font-medium">{uploadedFile.name}</span>
                  <Badge variant="secondary">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </Badge>
                </div>
                
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analizando imagen...</span>
                    </div>
                  </div>
                )}
                
                {!isLoading && analysisResults && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Análisis completado</span>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setUploadedFile(null);
                    setAnalysisResults(null);
                    setError('');
                  }}
                  disabled={isLoading}
                >
                  Cargar otra imagen
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Paso 2: Resultados del Análisis */}
      {uploadedFile && analysisResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen Original */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Imagen Original</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileImage className="w-16 h-16 mx-auto mb-4" />
                  <p>Imagen de microscopía cargada</p>
                  <p className="text-sm mt-2">{uploadedFile.name}</p>
                </div>
              </div>
              
              {/* Métricas principales */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-semibold text-accent">
                    {analysisResults.results.mixingLevel}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Eficiencia de Mezclado
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-semibold text-accent">
                    {analysisResults.results.statisticalMetrics[0]?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Uniformidad
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visualizaciones */}
          <div className="space-y-6">
            {/* Gráfico de Barras */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Nivel de Mezclado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mixingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Bar dataKey="nivel" fill="#1ABC9C" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Dispersión */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ScatterChart className="w-5 h-5" />
                  Métricas Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsScatter>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" name="Posición X" />
                    <YAxis dataKey="y" name="Calidad" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="size" fill="#0D2A4F" />
                  </RechartsScatter>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Resumen de Resultados */}
      {uploadedFile && analysisResults && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Resumen de Análisis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-semibold text-primary">
                  {analysisResults.results.mixingLevel}%
                </div>
                <div className="text-sm text-muted-foreground">Nivel de Mezclado</div>
              </div>
              {analysisResults.results.statisticalMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="text-2xl font-semibold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                </div>
              ))}
              <div className="col-span-2 md:col-span-3">
                <Button 
                  className="w-full bg-accent hover:bg-accent/90"
                  onClick={() => {
                    // Simular descarga del reporte
                    const blob = new Blob([JSON.stringify(analysisResults, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `analysis-report-${uploadedFile.name}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte Completo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}