import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Upload, FileText, BarChart3, Download, AlertCircle, CheckCircle } from 'lucide-react';

export function StatisticalAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Por favor seleccione un archivo CSV válido.');
      }
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError('');

    try {
      // Simular análisis estadístico con backend Python
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = {
        basicStats: {
          mean: 45.67,
          median: 43.2,
          std: 12.45,
          variance: 155.0,
          min: 12.3,
          max: 89.1,
          count: 1250
        },
        distribution: {
          skewness: 0.34,
          kurtosis: -0.12,
          normality_test: 'Normal (p=0.067)'
        },
        correlations: [
          { variables: 'Temperatura vs Presión', coefficient: 0.78 },
          { variables: 'Flujo vs Concentración', coefficient: -0.45 },
          { variables: 'Tiempo vs Eficiencia', coefficient: 0.92 }
        ]
      };

      setAnalysisResults(mockResults);
    } catch (err) {
      setError('Error durante el análisis estadístico. Verifique el formato de datos.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    const report = JSON.stringify(analysisResults, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analisis_estadistico.json';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Análisis Estadístico</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Cargue sus datos experimentales en formato CSV y obtenga análisis estadísticos completos 
          procesados con algoritmos avanzados de Python para caracterización de datos microfluídicos.
        </p>
      </div>

      {/* Carga de Archivo */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Carga de Datos Experimentales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Seleccione archivo CSV</p>
              <p className="text-sm text-gray-400">
                Formatos soportados: .csv (máximo 50MB)
              </p>
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-accent hover:opacity-80"
              >
                {isAnalyzing ? 'Analizando...' : 'Iniciar Análisis'}
              </Button>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados del Análisis */}
      {analysisResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estadísticas Básicas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Estadísticas Descriptivas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Media:</span>
                    <span className="font-mono">{analysisResults.basicStats.mean}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mediana:</span>
                    <span className="font-mono">{analysisResults.basicStats.median}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Desv. Estándar:</span>
                    <span className="font-mono">{analysisResults.basicStats.std}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Varianza:</span>
                    <span className="font-mono">{analysisResults.basicStats.variance}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mínimo:</span>
                    <span className="font-mono">{analysisResults.basicStats.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Máximo:</span>
                    <span className="font-mono">{analysisResults.basicStats.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Muestras:</span>
                    <span className="font-mono">{analysisResults.basicStats.count}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análisis de Distribución */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Análisis de Distribución</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Asimetría:</span>
                <span className="font-mono">{analysisResults.distribution.skewness}</span>
              </div>
              <div className="flex justify-between">
                <span>Curtosis:</span>
                <span className="font-mono">{analysisResults.distribution.kurtosis}</span>
              </div>
              <div className="flex justify-between">
                <span>Test Normalidad:</span>
                <span className="font-mono text-green-400">{analysisResults.distribution.normality_test}</span>
              </div>
            </CardContent>
          </Card>

          {/* Correlaciones */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="gradient-text">Matriz de Correlaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.correlations.map((corr: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                    <span>{corr.variables}</span>
                    <span className={`font-mono font-bold ${
                      Math.abs(corr.coefficient) > 0.7 ? 'text-green-400' : 
                      Math.abs(corr.coefficient) > 0.4 ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {corr.coefficient > 0 ? '+' : ''}{corr.coefficient}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Acciones */}
      {analysisResults && (
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex gap-4 justify-center">
              <Button onClick={downloadReport} className="bg-gradient-accent hover:opacity-80">
                <Download className="w-4 h-4 mr-2" />
                Descargar Reporte
              </Button>
              <Button variant="outline" className="border-gray-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Gráficos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
