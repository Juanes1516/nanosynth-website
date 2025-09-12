import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, Linkedin, GraduationCap, MapPin, Award, BookOpen, Search } from 'lucide-react';
import { teamMembers } from '../data/contentData';

export function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  // Obtener todas las especialidades únicas
  const allSpecialties = Array.from(
    new Set(teamMembers.flatMap(member => member.specialties))
  ).sort();

  // Paleta de colores temáticos para cada investigador
  const getMemberColorScheme = (index: number) => {
    const schemes = [
      { primary: 'emerald', secondary: 'teal', accent: 'green' },
      { primary: 'blue', secondary: 'cyan', accent: 'sky' },
      { primary: 'purple', secondary: 'violet', accent: 'fuchsia' },
      { primary: 'orange', secondary: 'amber', accent: 'yellow' },
      { primary: 'rose', secondary: 'pink', accent: 'red' },
      { primary: 'indigo', secondary: 'blue', accent: 'purple' }
    ];
    return schemes[index % schemes.length];
  };

  // Función para obtener colores de botones basados en la especialidad
  const getSpecialtyColor = (specialty: string) => {
    const colorMap: { [key: string]: string } = {
      'Microfluídica': 'emerald',
      'Nanotecnología': 'blue',
      'Bioingeniería': 'purple',
      'Síntesis de Nanomateriales': 'orange',
      'Caracterización': 'rose',
      'Simulación Computacional': 'indigo',
      'Análisis de Imagen': 'teal',
      'Machine Learning': 'violet',
      'Control de Procesos': 'amber',
      'Física de Materiales': 'cyan',
      'Espectroscopía': 'fuchsia',
      'Instrumentación': 'sky'
    };
    return colorMap[specialty] || 'cyan';
  };

  // Filtrar miembros del equipo
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = !searchTerm || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = !selectedSpecialty || 
      member.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="mb-4 gradient-text text-4xl font-bold">Equipo de Investigación</h1>
        <p className="text-gray-300 max-w-4xl mx-auto text-lg">
          Conozca a nuestro equipo multidisciplinario de investigadores especializados en microfluídica, 
          nanotecnología y bioingeniería. Juntos trabajamos para revolucionar la síntesis de nanomateriales.
        </p>
      </div>

      {/* Filtros de Búsqueda */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Buscar investigador</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Input
                  placeholder="Nombre, título o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Filtrar por especialidad</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedSpecialty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSpecialty('')}
                  className={!selectedSpecialty ? 'bg-cyan-500 text-white' : 'text-cyan-400 border-cyan-400 hover:bg-cyan-500/20'}
                >
                  Todas
                </Button>
                {allSpecialties.map(specialty => {
                  const specialtyColor = getSpecialtyColor(specialty);
                  return (
                    <Button
                      key={specialty}
                      variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={selectedSpecialty === specialty 
                        ? `bg-${specialtyColor}-500 text-white` 
                        : `text-${specialtyColor}-400 border-${specialtyColor}-400 hover:bg-${specialtyColor}-500/20`
                      }
                    >
                      {specialty}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMembers.map((member, index) => {
          const colorScheme = getMemberColorScheme(index);
          return (
            <Card key={member.id} className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Foto del investigador */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 mx-auto md:mx-0 relative">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-${colorScheme.primary}-400 to-${colorScheme.secondary}-400 opacity-20 blur-sm`}></div>
                    </div>
                  </div>

                  {/* Información principal */}
                  <div className="flex-1 space-y-4">
                    <div className="text-center md:text-left">
                      <h3 className={`text-2xl font-bold text-${colorScheme.primary}-300 mb-2`}>{member.name}</h3>
                      <div className={`inline-block px-4 py-2 rounded-full bg-${colorScheme.primary}-500/20 border border-${colorScheme.primary}-500/30 mb-3`}>
                        <p className={`text-${colorScheme.secondary}-300 font-semibold text-sm`}>{member.title}</p>
                      </div>
                      <div className={`flex items-center justify-center md:justify-start gap-2 mt-2 p-3 rounded-lg bg-${colorScheme.secondary}-500/10 border border-${colorScheme.secondary}-500/20`}>
                        <MapPin className={`w-5 h-5 text-${colorScheme.accent}-400`} />
                        <div>
                          <span className={`text-sm font-medium text-${colorScheme.accent}-300`}>{member.affiliation}</span>
                          <p className={`text-xs text-${colorScheme.accent}-400`}>{member.location}</p>
                        </div>
                      </div>
                    </div>

                  {/* Especialidades */}
                  <div className={`p-4 rounded-xl bg-gradient-to-r from-${colorScheme.primary}-500/5 to-${colorScheme.secondary}-500/5 border border-${colorScheme.primary}-500/20`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-${colorScheme.primary}-400`}></div>
                      <h4 className={`font-semibold text-${colorScheme.primary}-300 text-sm uppercase tracking-wide`}>Especialidades</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => {
                        const specialtyColor = getSpecialtyColor(specialty);
                        return (
                          <div 
                            key={index}
                            className={`px-3 py-1.5 rounded-full bg-${specialtyColor}-500/25 text-${specialtyColor}-200 border border-${specialtyColor}-500/40 hover:bg-${specialtyColor}-500/35 transition-all duration-200 text-xs font-medium shadow-sm`}
                          >
                            {specialty}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Métricas académicas */}
                  <div className={`p-4 rounded-xl bg-gradient-to-br from-${colorScheme.primary}-500/10 via-${colorScheme.secondary}-500/5 to-${colorScheme.accent}-500/10 border border-${colorScheme.primary}-500/20`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-2 h-2 rounded-full bg-${colorScheme.secondary}-400`}></div>
                      <h4 className={`font-semibold text-${colorScheme.secondary}-300 text-sm uppercase tracking-wide`}>Métricas Académicas</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className={`p-4 rounded-lg bg-${colorScheme.primary}-500/20 border border-${colorScheme.primary}-500/30 hover:bg-${colorScheme.primary}-500/25 transition-all duration-200`}>
                        <div className={`text-2xl font-bold text-${colorScheme.primary}-200 mb-1`}>{member.publications}</div>
                        <div className={`text-xs font-medium text-${colorScheme.primary}-300 uppercase tracking-wide`}>Publicaciones</div>
                      </div>
                      <div className={`p-4 rounded-lg bg-${colorScheme.secondary}-500/20 border border-${colorScheme.secondary}-500/30 hover:bg-${colorScheme.secondary}-500/25 transition-all duration-200`}>
                        <div className={`text-2xl font-bold text-${colorScheme.secondary}-200 mb-1`}>{member.hIndex}</div>
                        <div className={`text-xs font-medium text-${colorScheme.secondary}-300 uppercase tracking-wide`}>Índice h</div>
                      </div>
                      <div className={`p-4 rounded-lg bg-${colorScheme.accent}-500/20 border border-${colorScheme.accent}-500/30 hover:bg-${colorScheme.accent}-500/25 transition-all duration-200`}>
                        <div className={`text-2xl font-bold text-${colorScheme.accent}-200 mb-1`}>{member.experience}</div>
                        <div className={`text-xs font-medium text-${colorScheme.accent}-300 uppercase tracking-wide`}>Experiencia</div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className={`p-4 rounded-xl bg-gradient-to-r from-${colorScheme.accent}-500/5 to-${colorScheme.primary}-500/5 border border-${colorScheme.accent}-500/20`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-${colorScheme.accent}-400`}></div>
                      <h4 className={`font-semibold text-${colorScheme.accent}-300 text-sm uppercase tracking-wide`}>Perfil Profesional</h4>
                    </div>
                    <p className={`text-sm text-${colorScheme.accent}-200 leading-relaxed font-medium`}>
                      {member.bio}
                    </p>
                  </div>

                  {/* Contacto */}
                  <div className={`p-4 rounded-xl bg-gradient-to-r from-${colorScheme.primary}-500/5 to-${colorScheme.secondary}-500/5 border border-${colorScheme.primary}-500/20`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-${colorScheme.primary}-400`}></div>
                      <h4 className={`font-semibold text-${colorScheme.primary}-300 text-sm uppercase tracking-wide`}>Contacto</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                        className={`text-${colorScheme.primary}-300 border-${colorScheme.primary}-500/40 hover:bg-${colorScheme.primary}-500/20 hover:border-${colorScheme.primary}-400 transition-all duration-200 font-medium`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://linkedin.com/in/${member.linkedin}`, '_blank')}
                        className={`text-${colorScheme.secondary}-300 border-${colorScheme.secondary}-500/40 hover:bg-${colorScheme.secondary}-500/20 hover:border-${colorScheme.secondary}-400 transition-all duration-200 font-medium`}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://scholar.google.com/citations?user=${member.scholar}`, '_blank')}
                        className={`text-${colorScheme.accent}-300 border-${colorScheme.accent}-500/40 hover:bg-${colorScheme.accent}-500/20 hover:border-${colorScheme.accent}-400 transition-all duration-200 font-medium`}
                      >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Scholar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredMembers.length === 0 && (
        <Card className="glass-card shadow-lg">
          <CardContent className="py-12 text-center">
            <div className="text-gray-300">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50 text-cyan-400" />
              <h3 className="text-lg font-medium mb-2 text-white">No se encontraron investigadores</h3>
              <p className="text-gray-400">Intente ajustar los filtros de búsqueda o el término de búsqueda.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de colaboraciones */}
      <Card className="glass-card shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Colaboraciones Internacionales</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Nuestro equipo mantiene colaboraciones activas con instituciones de investigación líderes en todo el mundo, 
              incluyendo universidades en Estados Unidos, Europa y Asia, lo que nos permite estar a la vanguardia 
              de la investigación en microfluídica y nanotecnología.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-500/20">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Publicaciones
              </Button>
              <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-500/20">
                <Award className="w-4 h-4 mr-2" />
                Reconocimientos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
