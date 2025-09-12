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
        <h1 className="mb-4">Conozca a Nuestro Equipo</h1>
        <p className="text-muted-foreground max-w-4xl mx-auto">
          Nuestro equipo multidisciplinario de investigadores combina experiencia en microfluídica, 
          nanotecnología y análisis computacional para impulsar la innovación en dispositivos de síntesis automatizada.
        </p>
      </div>

      {/* Filtros de Búsqueda */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar investigador</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre, título o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filtrar por especialidad</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedSpecialty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSpecialty('')}
                >
                  Todas
                </Button>
                {allSpecialties.map(specialty => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Foto del investigador */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 mx-auto md:mx-0">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Información principal */}
                <div className="flex-1 space-y-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                    <p className="text-accent font-medium">{member.title}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{member.affiliation}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.location}</p>
                  </div>

                  {/* Especialidades */}
                  <div>
                    <h4 className="font-medium mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Métricas académicas */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{member.publications}</div>
                      <div className="text-xs text-muted-foreground">Publicaciones</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{member.hIndex}</div>
                      <div className="text-xs text-muted-foreground">Índice h</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{member.experience}</div>
                      <div className="text-xs text-muted-foreground">Experiencia</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Contacto */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://linkedin.com/in/${member.linkedin}`, '_blank')}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://scholar.google.com/citations?user=${member.scholar}`, '_blank')}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Scholar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredMembers.length === 0 && (
        <Card className="shadow-lg">
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No se encontraron investigadores</h3>
              <p>Intente ajustar los filtros de búsqueda o el término de búsqueda.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de colaboraciones */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Colaboraciones Internacionales</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Nuestro equipo mantiene colaboraciones activas con instituciones de investigación líderes en todo el mundo, 
              incluyendo universidades en Estados Unidos, Europa y Asia, lo que nos permite estar a la vanguardia 
              de la investigación en microfluídica y nanotecnología.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Publicaciones
              </Button>
              <Button variant="outline">
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
