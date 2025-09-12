/**
 * Datos para las páginas de contenido estático
 * Refactorizado para ser dinámico y fácil de mantener
 */

export interface ManufacturingMethod {
  id: string;
  title: string;
  image: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  timeToFabrication: string;
  cost: 'Bajo' | 'Medio' | 'Alto';
  complexity: 'Baja' | 'Media' | 'Alta';
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  location: string;
  image: string;
  specialties: string[];
  publications: number;
  hIndex: number;
  experience: string;
  bio: string;
  email: string;
  linkedin: string;
  scholar: string;
}

// Datos de métodos de manufactura
export const manufacturingMethods: ManufacturingMethod[] = [
  {
    id: 'printing',
    title: 'Impresión 3D por Resina',
    image: 'https://images.unsplash.com/photo-1662405964457-3cda8060b010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGFibGF0aW9uJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTY2MDY1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Fabricación aditiva de alta resolución utilizando fotopolímeros curables por UV. Ideal para geometrías complejas con resolución micrométrica.',
    advantages: ['Alta resolución (±10 μm)', 'Geometrías complejas', 'Bajo costo inicial'],
    disadvantages: ['Materiales limitados', 'Post-procesamiento requerido'],
    timeToFabrication: '2-4 horas',
    cost: 'Bajo',
    complexity: 'Media'
  },
  {
    id: 'laser',
    title: 'Ablación Láser',
    image: 'https://images.unsplash.com/photo-1657778752500-9da406aa813f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGFibGF0aW9uJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTY2MDY1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Proceso de remoción de material mediante láser pulsado de alta energía. Permite fabricación rápida con excelente control dimensional.',
    advantages: ['Velocidad alta', 'Sin herramientas especiales', 'Múltiples materiales'],
    disadvantages: ['Costo de equipo alto', 'Zona afectada por calor'],
    timeToFabrication: '30-60 minutos',
    cost: 'Alto',
    complexity: 'Alta'
  },
  {
    id: 'cnc',
    title: 'Mecanizado CNC',
    image: 'https://images.unsplash.com/photo-1726219837238-a30c5b17bc99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDTkMlMjBtaWxsaW5nJTIwcHJlY2lzaW9uJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NTY2MDY1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Fabricación sustractiva de ultra-precisión utilizando herramientas de corte controladas numéricamente. Excelente para prototipos funcionales.',
    advantages: ['Alta precisión (±2 μm)', 'Amplia gama de materiales', 'Acabado superficial excelente'],
    disadvantages: ['Geometrías limitadas', 'Tiempo de fabricación alto'],
    timeToFabrication: '4-8 horas',
    cost: 'Medio',
    complexity: 'Media'
  },
  {
    id: 'soft-lithography',
    title: 'Litografía Suave',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRob2dyYXBoeSUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU2NjA2NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Técnica de fabricación mediante moldes elastoméricos para crear microestructuras. Ideal para producción en masa de dispositivos microfluídicos.',
    advantages: ['Producción en masa', 'Bajo costo por unidad', 'Excelente resolución'],
    disadvantages: ['Requiere molde maestro', 'Limitado a PDMS'],
    timeToFabrication: '1-2 días (inicial), 1 hora (reproducción)',
    cost: 'Bajo',
    complexity: 'Baja'
  }
];

// Datos del equipo de investigación
export const teamMembers: TeamMember[] = [
  {
    id: 'maria-rodriguez',
    name: 'Dr. María Elena Rodríguez',
    title: 'Profesora de Ingeniería Biomédica',
    affiliation: 'Universidad Nacional de Colombia',
    location: 'Bogotá, Colombia',
    image: 'https://images.unsplash.com/photo-1581093577421-f561a654a353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzr8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHNjaWVudGlzdCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU2NjA2NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specialties: ['Microfluídica', 'Nanotecnología', 'Bioingeniería'],
    publications: 47,
    hIndex: 23,
    experience: '15+ años',
    bio: 'Especialista en el diseño y fabricación de dispositivos microfluídicos para aplicaciones biomédicas. Pionera en el desarrollo de sistemas de síntesis de nanopartículas controlada por flujo.',
    email: 'me.rodriguez@unal.edu.co',
    linkedin: 'maria-rodriguez-bioeng',
    scholar: 'scholar-id-123'
  },
  {
    id: 'carlos-mendoza',
    name: 'Dr. Carlos Alberto Mendoza',
    title: 'Investigador Senior en Nanomateriales',
    affiliation: 'Instituto Tecnológico de Monterrey',
    location: 'Monterrey, México',
    image: 'https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjByZXNlYXRjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NjA2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specialties: ['Síntesis de Nanomateriales', 'Caracterización', 'Simulación Computacional'],
    publications: 62,
    hIndex: 31,
    experience: '18+ años',
    bio: 'Experto en la síntesis controlada de nanomateriales mediante técnicas de flujo continuo. Sus investigaciones se centran en optimización de procesos y escalamiento industrial.',
    email: 'carlos.mendoza@itesm.mx',
    linkedin: 'carlos-mendoza-nano',
    scholar: 'scholar-id-456'
  },
  {
    id: 'ana-castro',
    name: 'Dr. Ana Sofía Castro',
    title: 'Profesora Asistente de Ingeniería Química',
    affiliation: 'Universidad de Chile',
    location: 'Santiago, Chile',
    image: 'https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx5b3VuZyUyMHJlc2VhcmNoZXIlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjYwNjYzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specialties: ['Análisis de Imagen', 'Machine Learning', 'Control de Procesos'],
    publications: 28,
    hIndex: 16,
    experience: '8+ años',
    bio: 'Especialista en el desarrollo de algoritmos de visión por computadora para análisis automatizado de procesos microfluídicos y caracterización de nanopartículas en tiempo real.',
    email: 'ana.castro@uchile.cl',
    linkedin: 'ana-castro-ai',
    scholar: 'scholar-id-789'
  },
  {
    id: 'roberto-silva',
    name: 'Dr. Roberto Silva Hernández',
    title: 'Director de Investigación',
    affiliation: 'CINVESTAV',
    location: 'Ciudad de México, México',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXQlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1NjYwNjYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specialties: ['Física de Materiales', 'Espectroscopía', 'Instrumentación'],
    publications: 89,
    hIndex: 42,
    experience: '25+ años',
    bio: 'Físico experimentalista con amplia experiencia en caracterización de nanomateriales. Líder en el desarrollo de nuevas técnicas de espectroscopía para análisis in-situ.',
    email: 'roberto.silva@cinvestav.mx',
    linkedin: 'roberto-silva-phys',
    scholar: 'scholar-id-101'
  }
];
