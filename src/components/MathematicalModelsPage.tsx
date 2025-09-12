import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, Calculator, BookOpen, Download, Zap, TrendingUp } from 'lucide-react';

interface MathematicalModel {
  id: string;
  name: string;
  category: string;
  complexity: 'Baja' | 'Media' | 'Alta';
  description: string;
  equations: string[];
  parameters: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
}

const mathematicalModels: MathematicalModel[] = [
  {
    id: 'navier-stokes',
    name: 'Ecuaciones de Navier-Stokes',
    category: 'Dinámica de Fluidos',
    complexity: 'Alta',
    description: 'Modelo fundamental para describir el movimiento de fluidos viscosos en sistemas microfluídicos.',
    equations: [
      '∂u/∂t + (u·∇)u = -∇p/ρ + ν∇²u + f',
      '∇·u = 0 (incompresible)'
    ],
    parameters: ['Velocidad (u)', 'Presión (p)', 'Densidad (ρ)', 'Viscosidad (ν)'],
    applications: ['Análisis de flujo laminar', 'Diseño de canales', 'Optimización de mezclado'],
    advantages: ['Descripción completa del flujo', 'Base teórica sólida', 'Ampliamente validado'],
    limitations: ['Computacionalmente intensivo', 'Requiere condiciones de frontera precisas', 'Difícil para geometrías complejas']
  },
  {
    id: 'diffusion-advection',
    name: 'Ecuación de Difusión-Advección',
    category: 'Transporte de Masa',
    complexity: 'Media',
    description: 'Modelo para el transporte de especies químicas en flujos microfluídicos.',
    equations: [
      '∂C/∂t + u·∇C = D∇²C + R',
      'J = -D∇C + uC'
    ],
    parameters: ['Concentración (C)', 'Difusividad (D)', 'Velocidad (u)', 'Reacción (R)'],
    applications: ['Mezclado de reactivos', 'Separación de especies', 'Análisis de gradientes'],
    advantages: ['Modelo bien establecido', 'Soluciones analíticas disponibles', 'Fácil implementación'],
    limitations: ['Asume propiedades constantes', 'No considera efectos no lineales', 'Limitado a geometrías simples']
  },
  {
    id: 'reynolds-lubrication',
    name: 'Ecuación de Reynolds',
    category: 'Flujos Delgados',
    complexity: 'Media',
    description: 'Aproximación para flujos en canales muy delgados típicos de dispositivos microfluídicos.',
    equations: [
      '∇·(h³∇p) = 6μU∂h/∂x + 12μ∂h/∂t',
      'Q = -h³∇p/(12μ) + Uh/2'
    ],
    parameters: ['Altura del canal (h)', 'Presión (p)', 'Viscosidad (μ)', 'Velocidad (U)'],
    applications: ['Canales de altura variable', 'Válvulas microfluídicas', 'Bombas peristálticas'],
    advantages: ['Computacionalmente eficiente', 'Buena aproximación para canales delgados', 'Soluciones rápidas'],
    limitations: ['Solo válido para h << L', 'Asume flujo laminar', 'No considera efectos 3D']
  },
  {
    id: 'electrokinetic',
    name: 'Modelo Electrocinético',
    category: 'Electrofluidica',
    complexity: 'Alta',
    description: 'Describe el transporte de fluidos y especies bajo campos eléctricos.',
    equations: [
      '∇²φ = -ρₑ/ε (Poisson)',
      'u = μₑₒE - (εζ/μ)E (Electroosmosis)',
      'J = σE + ρₑu (Corriente)'
    ],
    parameters: ['Potencial eléctrico (φ)', 'Campo eléctrico (E)', 'Potencial zeta (ζ)', 'Conductividad (σ)'],
    applications: ['Separación electroforética', 'Bombeo electroosmótico', 'Enfoque isoeléctrico'],
    advantages: ['Control preciso del flujo', 'Sin partes móviles', 'Selectividad química'],
    limitations: ['Requiere conductividad específica', 'Efectos de calentamiento Joule', 'Geometrías complejas']
  },
  {
    id: 'droplet-formation',
    name: 'Modelo de Formación de Gotas',
    category: 'Flujos Bifásicos',
    complexity: 'Alta',
    description: 'Predice la formación y tamaño de gotas en sistemas microfluídicos bifásicos.',
    equations: [
      'D/w = f(Qd/Qc, Ca, Re)',
      'Ca = μᵤU/σ (Número Capilar)',
      'We = ρU²L/σ (Número Weber)'
    ],
    parameters: ['Diámetro gota (D)', 'Tensión superficial (σ)', 'Flujos (Qd, Qc)', 'Viscosidades (μ)'],
    applications: ['Generación de emulsiones', 'Encapsulación', 'Síntesis de partículas'],
    advantages: ['Predicción de tamaño de gota', 'Control de monodispersidad', 'Escalabilidad'],
    limitations: ['Parámetros empíricos', 'Dependiente de la geometría', 'Efectos dinámicos complejos']
  },
  {
    id: 'heat-transfer',
    name: 'Transferencia de Calor',
    category: 'Térmica',
    complexity: 'Media',
    description: 'Modelo para análisis térmico en dispositivos microfluídicos con calentamiento/enfriamiento.',
    equations: [
      '∂T/∂t + u·∇T = α∇²T + Q/(ρCₚ)',
      'q = -k∇T (Ley de Fourier)'
    ],
    parameters: ['Temperatura (T)', 'Difusividad térmica (α)', 'Conductividad (k)', 'Fuente de calor (Q)'],
    applications: ['PCR en chip', 'Control de temperatura', 'Gradientes térmicos'],
    advantages: ['Modelo bien conocido', 'Soluciones disponibles', 'Acoplamiento con flujo'],
    limitations: ['Propiedades constantes', 'No considera radiación', 'Efectos de miniaturización']
  }
];

export function MathematicalModelsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');

  // Obtener categorías y complejidades únicas
  const allCategories = Array.from(new Set(mathematicalModels.map(model => model.category))).sort();
  const allComplexities = ['Baja', 'Media', 'Alta'];

  // Filtrar modelos
  const filteredModels = mathematicalModels.filter(model => {
    const matchesSearch = !searchTerm || 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || model.category === selectedCategory;
    const matchesComplexity = !selectedComplexity || model.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Baja': return 'bg-green-100 text-green-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Modelos Matemáticos</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Explore los modelos matemáticos fundamentales para el diseño y análisis de sistemas microfluídicos. 
          Desde ecuaciones de flujo hasta modelos de transporte y fenómenos acoplados.
        </p>
      </div>

      {/* Filtros */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar modelo</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre, categoría o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
              >
                <option value="">Todas las categorías</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Complejidad</label>
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
              >
                <option value="">Todas las complejidades</option>
                {allComplexities.map(complexity => (
                  <option key={complexity} value={complexity}>{complexity}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Modelos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModels.map((model) => (
          <Card key={model.id} className="glass-card hover:bg-gray-800/40 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="gradient-text text-xl mb-2">{model.name}</CardTitle>
                  <Badge variant="outline" className="mb-2">{model.category}</Badge>
                </div>
                <Badge className={getComplexityColor(model.complexity)}>
                  {model.complexity}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm">{model.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ecuaciones */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Ecuaciones Principales
                </h4>
                <div className="space-y-1">
                  {model.equations.map((eq, index) => (
                    <div key={index} className="font-mono text-sm bg-gray-800/50 p-2 rounded">
                      {eq}
                    </div>
                  ))}
                </div>
              </div>

              {/* Parámetros */}
              <div>
                <h4 className="font-semibold mb-2">Parámetros Clave</h4>
                <div className="flex flex-wrap gap-1">
                  {model.parameters.map((param, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {param}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Aplicaciones */}
              <div>
                <h4 className="font-semibold mb-2">Aplicaciones</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {model.applications.slice(0, 3).map((app, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-gradient-accent hover:opacity-80">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Detalles
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  Plantilla
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron modelos</h3>
            <p className="text-gray-400">
              Intente ajustar los filtros de búsqueda para encontrar modelos matemáticos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
