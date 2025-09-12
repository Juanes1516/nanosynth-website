import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, DollarSign, Gauge, CheckCircle, XCircle, Filter } from 'lucide-react';
import { manufacturingMethods } from '../data/contentData';

export function ManufacturingPage() {
  const [selectedCost, setSelectedCost] = useState<string>('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');

  // Filtrar métodos basado en las selecciones del usuario
  const filteredMethods = manufacturingMethods.filter(method => {
    const costMatch = !selectedCost || method.cost === selectedCost;
    const complexityMatch = !selectedComplexity || method.complexity === selectedComplexity;
    return costMatch && complexityMatch;
  });

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Bajo': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'Medio': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'Alto': return 'bg-red-500/20 text-red-300 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Baja': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Media': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'Alta': return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Guía de Métodos de Manufactura</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Explore las diferentes técnicas de fabricación disponibles para la creación de dispositivos microfluídicos, 
          sus ventajas, limitaciones y aplicaciones específicas en la síntesis de nanomateriales.
        </p>
      </div>

      {/* Filtros */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Filter className="w-5 h-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Costo</label>
              <div className="flex gap-2">
                {['Bajo', 'Medio', 'Alto'].map(cost => (
                  <Button
                    key={cost}
                    variant={selectedCost === cost ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCost(selectedCost === cost ? '' : cost)}
                    className={selectedCost === cost ? 'bg-cyan-500 text-white' : 'text-cyan-400 border-cyan-400 hover:bg-cyan-500/20'}
                  >
                    {cost}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Complejidad</label>
              <div className="flex gap-2">
                {['Baja', 'Media', 'Alta'].map(complexity => (
                  <Button
                    key={complexity}
                    variant={selectedComplexity === complexity ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedComplexity(selectedComplexity === complexity ? '' : complexity)}
                    className={selectedComplexity === complexity ? 'bg-cyan-500 text-white' : 'text-cyan-400 border-cyan-400 hover:bg-cyan-500/20'}
                  >
                    {complexity}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCost('');
                  setSelectedComplexity('');
                }}
                disabled={!selectedCost && !selectedComplexity}
                className="text-cyan-400 hover:bg-cyan-500/20"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMethods.map((method) => (
          <Card key={method.id} className="glass-card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={method.image}
                alt={method.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl text-white">{method.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                {method.description}
              </p>

              {/* Métricas clave */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Tiempo de fabricación
                  </span>
                  <span className="font-medium text-white">{method.timeToFabrication}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-300">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    Costo
                  </span>
                  <Badge className={getCostColor(method.cost)}>
                    {method.cost}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-300">
                    <Gauge className="w-4 h-4 text-cyan-400" />
                    Complejidad
                  </span>
                  <Badge className={getComplexityColor(method.complexity)}>
                    {method.complexity}
                  </Badge>
                </div>
              </div>

              {/* Ventajas */}
              <div>
                <h4 className="font-medium mb-2 text-green-400">Ventajas</h4>
                <ul className="space-y-1">
                  {method.advantages.map((advantage, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desventajas */}
              <div>
                <h4 className="font-medium mb-2 text-red-400">Limitaciones</h4>
                <ul className="space-y-1">
                  {method.disadvantages.map((disadvantage, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                      {disadvantage}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de comparación */}
      <Card className="glass-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Guía de Selección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h3 className="text-white text-xl font-semibold mb-4">¿Cómo elegir el método adecuado?</h3>
            <ul className="space-y-2">
              <li className="text-gray-300"><strong className="text-cyan-400">Para prototipos rápidos:</strong> Use impresión 3D por resina para validación de concepto inicial.</li>
              <li className="text-gray-300"><strong className="text-cyan-400">Para producción de volumen medio:</strong> La ablación láser ofrece el mejor balance entre velocidad y calidad.</li>
              <li className="text-gray-300"><strong className="text-cyan-400">Para aplicaciones críticas:</strong> El mecanizado CNC proporciona la máxima precisión y repetibilidad.</li>
              <li className="text-gray-300"><strong className="text-cyan-400">Para geometrías complejas:</strong> La impresión 3D permite estructuras imposibles con métodos sustractivos.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}