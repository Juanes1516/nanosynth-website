/**
 * Servicios API simulados para NanoSynth
 * Simula la comunicación con el backend con latencia realista
 */

// Tipos para las respuestas de la API
export interface SimulationFile {
  name: string;
  url: string;
}

export interface SimulationResponse {
  files: SimulationFile[];
}

export interface AnalysisResults {
  mixingLevel: number;
  statisticalMetrics: Array<{
    name: string;
    value: number;
  }>;
}

export interface AnalysisResponse {
  results: AnalysisResults;
}

/**
 * Simula la generación de diseños microfluídicos
 * POST /api/generate
 */
export const generateDesign = async (payload: {
  method: string;
  kinetics: string;
}): Promise<SimulationResponse> => {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simular posible error de red (5% probabilidad)
  if (Math.random() < 0.05) {
    throw new Error('Error de conexión con el servidor. Intente nuevamente.');
  }

  // Respuesta simulada exitosa
  return {
    files: [
      {
        name: 'Geometría del Dispositivo (.CAD)',
        url: '#'
      },
      {
        name: 'Archivo de Simulación (.java)',
        url: '#'
      },
      {
        name: 'Parámetros de Manufactura (.pdf)',
        url: '#'
      }
    ]
  };
};

/**
 * Simula el análisis de imágenes experimentales
 * POST /api/analyze
 */
export const analyzeImage = async (imageFile: File): Promise<AnalysisResponse> => {
  // Simular latencia de red (procesamiento más largo)
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Simular posible error de procesamiento (3% probabilidad)
  if (Math.random() < 0.03) {
    throw new Error('Error en el procesamiento de la imagen. Verifique el formato del archivo.');
  }

  // Generar resultados simulados basados en el archivo
  const randomMixingLevel = 80 + Math.random() * 15; // Entre 80-95%
  
  return {
    results: {
      mixingLevel: Number(randomMixingLevel.toFixed(1)),
      statisticalMetrics: [
        { name: 'Uniformidad de Partículas', value: Number((85 + Math.random() * 10).toFixed(2)) },
        { name: 'Eficiencia de Mezclado', value: Number((90 + Math.random() * 8).toFixed(2)) },
        { name: 'Estabilidad del Flujo', value: Number((88 + Math.random() * 7).toFixed(2)) },
        { name: 'Tamaño Promedio (nm)', value: Number((45 + Math.random() * 10).toFixed(1)) },
        { name: 'Desviación Estándar', value: Number((5 + Math.random() * 8).toFixed(2)) }
      ]
    }
  };
};
