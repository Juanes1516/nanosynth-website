import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, FileText, Activity, Download, AlertCircle, CheckCircle, Zap } from 'lucide-react';

export function PIVAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pivResults, setPivResults] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Por favor seleccione un archivo CSV con matrices PIV válido.');
      }
    }
  };

  const handlePIVAnalysis = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      // Simular procesamiento PIV
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockResults = {
        velocityField: {
          maxVelocity: 2.45,
          minVelocity: 0.12,
          avgVelocity: 1.23,
          unit: 'm/s'
        },
        flowCharacteristics: {
          reynoldsNumber: 1250,
          flowRegime: 'Laminar',
          vorticityMax: 45.6,
          streamlineCount: 156
        },
        spatialAnalysis: {
          gridResolution: '64x64',
          vectorCount: 4096,
          validVectors: 3890,
          interpolatedVectors: 206
        },
        qualityMetrics: {
          signalToNoise: 8.5,
          peakRatio: 1.8,
          validationRate: 95.0
        }
      };

      setPivResults(mockResults);
    } catch (err) {
      setError('Error durante el análisis PIV. Verifique el formato de las matrices.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResults = () => {
    const report = JSON.stringify(pivResults, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analisis_piv.json';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Análisis PIV</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Particle Image Velocimetry - Analice campos de velocidad y patrones de flujo 
          a partir de matrices de datos experimentales para caracterización microfluídica avanzada.
        </p>
      </div>

      {/* Carga de Matrices PIV */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Carga de Matrices PIV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="piv-upload"
            />
            <label htmlFor="piv-upload" className="cursor-pointer">
              <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Seleccione archivo CSV con matrices PIV</p>
              <p className="text-sm text-gray-400">
                Matrices de velocidad en formato CSV (máximo 100MB)
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
                onClick={handlePIVAnalysis}
                disabled={isProcessing}
                className="bg-gradient-accent hover:opacity-80"
              >
                {isProcessing ? 'Procesando PIV...' : 'Analizar PIV'}
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

      {/* Resultados PIV */}
      {pivResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campo de Velocidades */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Campo de Velocidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Velocidad Máxima:</span>
                <span className="font-mono text-green-400">
                  {pivResults.velocityField.maxVelocity} {pivResults.velocityField.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Velocidad Mínima:</span>
                <span className="font-mono">
                  {pivResults.velocityField.minVelocity} {pivResults.velocityField.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Velocidad Promedio:</span>
                <span className="font-mono">
                  {pivResults.velocityField.avgVelocity} {pivResults.velocityField.unit}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Características del Flujo */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Características del Flujo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Número de Reynolds:</span>
                <span className="font-mono">{pivResults.flowCharacteristics.reynoldsNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Régimen de Flujo:</span>
                <span className="font-mono text-blue-400">{pivResults.flowCharacteristics.flowRegime}</span>
              </div>
              <div className="flex justify-between">
                <span>Vorticidad Máxima:</span>
                <span className="font-mono">{pivResults.flowCharacteristics.vorticityMax} s⁻¹</span>
              </div>
              <div className="flex justify-between">
                <span>Líneas de Corriente:</span>
                <span className="font-mono">{pivResults.flowCharacteristics.streamlineCount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Análisis Espacial */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Análisis Espacial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Resolución de Grilla:</span>
                <span className="font-mono">{pivResults.spatialAnalysis.gridResolution}</span>
              </div>
              <div className="flex justify-between">
                <span>Vectores Totales:</span>
                <span className="font-mono">{pivResults.spatialAnalysis.vectorCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Vectores Válidos:</span>
                <span className="font-mono text-green-400">{pivResults.spatialAnalysis.validVectors}</span>
              </div>
              <div className="flex justify-between">
                <span>Vectores Interpolados:</span>
                <span className="font-mono text-yellow-400">{pivResults.spatialAnalysis.interpolatedVectors}</span>
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Calidad */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="gradient-text">Métricas de Calidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Relación S/N:</span>
                <span className="font-mono text-green-400">{pivResults.qualityMetrics.signalToNoise}</span>
              </div>
              <div className="flex justify-between">
                <span>Ratio de Picos:</span>
                <span className="font-mono">{pivResults.qualityMetrics.peakRatio}</span>
              </div>
              <div className="flex justify-between">
                <span>Tasa de Validación:</span>
                <span className="font-mono text-green-400">{pivResults.qualityMetrics.validationRate}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Visualización y Descarga */}
      {pivResults && (
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex gap-4 justify-center">
              <Button onClick={downloadResults} className="bg-gradient-accent hover:opacity-80">
                <Download className="w-4 h-4 mr-2" />
                Descargar Resultados
              </Button>
              <Button variant="outline" className="border-gray-600">
                <Zap className="w-4 h-4 mr-2" />
                Visualizar Campo
              </Button>
              <Button variant="outline" className="border-gray-600">
                <Activity className="w-4 h-4 mr-2" />
                Generar Streamlines
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
