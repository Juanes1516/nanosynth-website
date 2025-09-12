import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, Microscope, FlaskConical, Zap, Timer, ChevronDown, ChevronRight } from 'lucide-react';

interface CharacterizationMethod {
  id: string;
  name: string;
  category: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  duration: string;
  description: string;
  equipment: string[];
  steps: {
    title: string;
    description: string;
    duration: string;
    tips: string[];
  }[];
  applications: string[];
  precautions: string[];
}

const characterizationMethods: CharacterizationMethod[] = [
  {
    id: 'flow-visualization',
    name: 'Visualización de Flujo con Trazadores',
    category: 'Dinámica de Fluidos',
    difficulty: 'Básico',
    duration: '2-3 horas',
    description: 'Técnica para visualizar patrones de flujo usando partículas trazadoras fluorescentes.',
    equipment: ['Microscopio de fluorescencia', 'Partículas fluorescentes', 'Bomba de jeringa', 'Cámara CCD'],
    steps: [
      {
        title: 'Preparación de la muestra',
        description: 'Preparar la solución con partículas trazadoras fluorescentes',
        duration: '30 min',
        tips: [
          'Usar concentración de 0.1-1% de partículas',
          'Verificar que las partículas no se agreguen',
          'Filtrar la solución para eliminar burbujas'
        ]
      },
      {
        title: 'Configuración del sistema',
        description: 'Montar el dispositivo microfluídico y configurar el microscopio',
        duration: '45 min',
        tips: [
          'Asegurar que no haya fugas en las conexiones',
          'Calibrar el sistema de iluminación',
          'Ajustar el enfoque del microscopio'
        ]
      },
      {
        title: 'Inyección y estabilización',
        description: 'Inyectar la solución y esperar estabilización del flujo',
        duration: '15 min',
        tips: [
          'Comenzar con flujo bajo para evitar burbujas',
          'Esperar al menos 5 minutos para estabilización',
          'Verificar que el flujo sea constante'
        ]
      },
      {
        title: 'Captura de imágenes',
        description: 'Capturar secuencias de imágenes del flujo',
        duration: '60 min',
        tips: [
          'Usar tiempo de exposición adecuado',
          'Capturar múltiples regiones del dispositivo',
          'Guardar imágenes en formato sin compresión'
        ]
      },
      {
        title: 'Análisis de datos',
        description: 'Procesar las imágenes para extraer información del flujo',
        duration: '30 min',
        tips: [
          'Usar software de análisis de imágenes',
          'Calcular velocidades y trayectorias',
          'Generar mapas de velocidad'
        ]
      }
    ],
    applications: ['Validación de simulaciones CFD', 'Caracterización de mezclado', 'Detección de recirculación'],
    precautions: ['Evitar fotoblanqueamiento', 'Controlar temperatura', 'Minimizar vibración del sistema']
  },
  {
    id: 'pressure-drop',
    name: 'Medición de Caída de Presión',
    category: 'Caracterización Hidráulica',
    difficulty: 'Intermedio',
    duration: '1-2 horas',
    description: 'Determinación de la resistencia hidráulica del dispositivo microfluídico.',
    equipment: ['Sensor de presión diferencial', 'Bomba de jeringa', 'Multímetro', 'Fluido de trabajo'],
    steps: [
      {
        title: 'Calibración del sensor',
        description: 'Calibrar el sensor de presión diferencial',
        duration: '20 min',
        tips: [
          'Usar presiones conocidas para calibración',
          'Verificar linealidad del sensor',
          'Anotar la ecuación de calibración'
        ]
      },
      {
        title: 'Conexión del sistema',
        description: 'Conectar el dispositivo al sistema de medición',
        duration: '15 min',
        tips: [
          'Usar tubos de diámetro pequeño',
          'Minimizar volumen muerto',
          'Verificar hermeticidad del sistema'
        ]
      },
      {
        title: 'Medición a diferentes flujos',
        description: 'Medir presión a diferentes caudales',
        duration: '45 min',
        tips: [
          'Comenzar con flujos bajos',
          'Esperar estabilización entre mediciones',
          'Tomar múltiples lecturas por punto'
        ]
      },
      {
        title: 'Análisis de resultados',
        description: 'Calcular resistencia hidráulica y validar con teoría',
        duration: '20 min',
        tips: [
          'Graficar ΔP vs Q',
          'Calcular pendiente (resistencia)',
          'Comparar con modelos teóricos'
        ]
      }
    ],
    applications: ['Validación de diseños', 'Control de calidad', 'Optimización de canales'],
    precautions: ['No exceder presión máxima del chip', 'Evitar burbujas en el sistema', 'Controlar temperatura']
  },
  {
    id: 'mixing-efficiency',
    name: 'Caracterización de Eficiencia de Mezclado',
    category: 'Transporte de Masa',
    difficulty: 'Intermedio',
    duration: '3-4 horas',
    description: 'Evaluación cuantitativa de la eficiencia de mezclado usando análisis de imágenes.',
    equipment: ['Microscopio', 'Colorantes', 'Bomba dual', 'Software de análisis'],
    steps: [
      {
        title: 'Preparación de soluciones',
        description: 'Preparar soluciones con diferentes colorantes',
        duration: '30 min',
        tips: [
          'Usar colorantes con propiedades similares',
          'Ajustar concentraciones para buen contraste',
          'Verificar estabilidad de los colorantes'
        ]
      },
      {
        title: 'Configuración de flujos',
        description: 'Configurar flujos de entrada balanceados',
        duration: '45 min',
        tips: [
          'Usar bombas de jeringa duales',
          'Verificar simetría de flujos',
          'Calibrar caudales independientemente'
        ]
      },
      {
        title: 'Captura de imágenes',
        description: 'Capturar imágenes a lo largo del canal de mezclado',
        duration: '90 min',
        tips: [
          'Capturar múltiples posiciones axiales',
          'Usar iluminación uniforme',
          'Mantener condiciones constantes'
        ]
      },
      {
        title: 'Análisis cuantitativo',
        description: 'Calcular índices de mezclado',
        duration: '45 min',
        tips: [
          'Usar índice de intensidad de segregación',
          'Calcular longitud de mezclado',
          'Generar perfiles de concentración'
        ]
      }
    ],
    applications: ['Optimización de mezcladores', 'Validación de CFD', 'Control de procesos'],
    precautions: ['Evitar sedimentación de colorantes', 'Controlar pH de soluciones', 'Minimizar fotodegradación']
  },
  {
    id: 'droplet-size',
    name: 'Caracterización de Tamaño de Gotas',
    category: 'Flujos Bifásicos',
    difficulty: 'Avanzado',
    duration: '4-5 horas',
    description: 'Medición precisa del tamaño y distribución de gotas en sistemas microfluídicos.',
    equipment: ['Cámara de alta velocidad', 'Microscopio', 'Fluidos inmiscibles', 'Software de análisis'],
    steps: [
      {
        title: 'Preparación de fases',
        description: 'Preparar fase dispersa y continua',
        duration: '45 min',
        tips: [
          'Verificar inmiscibilidad completa',
          'Ajustar tensión superficial si necesario',
          'Filtrar ambas fases'
        ]
      },
      {
        title: 'Optimización de condiciones',
        description: 'Encontrar condiciones para generación estable',
        duration: '90 min',
        tips: [
          'Variar relación de flujos',
          'Ajustar propiedades de fluidos',
          'Verificar régimen de formación'
        ]
      },
      {
        title: 'Captura de video',
        description: 'Grabar formación y transporte de gotas',
        duration: '60 min',
        tips: [
          'Usar alta velocidad de captura',
          'Enfocar en zona de formación',
          'Capturar múltiples ciclos'
        ]
      },
      {
        title: 'Análisis estadístico',
        description: 'Medir tamaños y calcular distribuciones',
        duration: '90 min',
        tips: [
          'Medir al menos 100 gotas',
          'Calcular diámetro equivalente',
          'Determinar coeficiente de variación'
        ]
      }
    ],
    applications: ['Control de calidad de emulsiones', 'Optimización de geometrías', 'Estudios de escalamiento'],
    precautions: ['Evitar contaminación cruzada', 'Controlar temperatura', 'Verificar mojabilidad del chip']
  }
];

export function ExperimentalCharacterizationPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [expandedMethod, setExpandedMethod] = useState<string>('');

  // Obtener categorías y dificultades únicas
  const allCategories = Array.from(new Set(characterizationMethods.map(method => method.category))).sort();
  const allDifficulties = ['Básico', 'Intermedio', 'Avanzado'];

  // Filtrar métodos
  const filteredMethods = characterizationMethods.filter(method => {
    const matchesSearch = !searchTerm || 
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || method.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || method.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpanded = (methodId: string) => {
    setExpandedMethod(expandedMethod === methodId ? '' : methodId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Caracterización Experimental</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Guías paso a paso para métodos de caracterización experimental en microfluídica. 
          Desde técnicas básicas hasta protocolos avanzados para validación y optimización de dispositivos.
        </p>
      </div>

      {/* Filtros */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar método</label>
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
              <label className="block text-sm font-medium mb-2">Dificultad</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
              >
                <option value="">Todas las dificultades</option>
                {allDifficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Métodos */}
      <div className="space-y-6">
        {filteredMethods.map((method) => (
          <Card key={method.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="gradient-text text-xl">{method.name}</CardTitle>
                    <Badge variant="outline">{method.category}</Badge>
                    <Badge className={getDifficultyColor(method.difficulty)}>
                      {method.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{method.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      {method.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <FlaskConical className="w-4 h-4" />
                      {method.equipment.length} equipos
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(method.id)}
                  className="ml-4"
                >
                  {expandedMethod === method.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedMethod === method.id && (
              <CardContent className="space-y-6">
                {/* Equipos Necesarios */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Microscope className="w-4 h-4" />
                    Equipos Necesarios
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {method.equipment.map((equipment, index) => (
                      <Badge key={index} variant="secondary" className="text-xs justify-center">
                        {equipment}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Procedimiento Paso a Paso */}
                <div>
                  <h4 className="font-semibold mb-3">Procedimiento Paso a Paso</h4>
                  <div className="space-y-4">
                    {method.steps.map((step, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <h5 className="font-medium">{step.title}</h5>
                          <Badge variant="outline" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2 ml-8">{step.description}</p>
                        <div className="ml-8">
                          <p className="text-xs font-medium mb-1">Consejos:</p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aplicaciones y Precauciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Aplicaciones</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {method.applications.map((app, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Precauciones
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {method.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                          {precaution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredMethods.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Microscope className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron métodos</h3>
            <p className="text-gray-400">
              Intente ajustar los filtros de búsqueda para encontrar métodos de caracterización.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
