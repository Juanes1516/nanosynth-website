import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, Linkedin, GraduationCap, MapPin, Award, BookOpen, Search } from 'lucide-react';
import { teamMembers, TeamMember } from '../data/contentData';

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
        {filteredMembers.map((member, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Foto de perfil */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Información del miembro */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-accent font-medium">{member.title}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {member.affiliation}
                    </p>
                    <p className="text-muted-foreground text-sm">{member.location}</p>
                  </div>

                  {/* Especialidades */}
                  <div>
                    <p className="text-sm font-medium mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Métricas académicas */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                    <div className="text-center">
                      <div className="font-semibold text-primary">{member.publications}</div>
                      <div className="text-xs text-muted-foreground">Publicaciones</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary">{member.hIndex}</div>
                      <div className="text-xs text-muted-foreground">Índice H</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary">{member.experience}</div>
                      <div className="text-xs text-muted-foreground">Experiencia</div>
                    </div>
                  </div>

                  {/* Biografía */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Enlaces de contacto */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Scholar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de colaboración */}
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <Award className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Colaboración Académica</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro equipo colabora activamente con instituciones de investigación de América Latina 
                y Europa en el desarrollo de tecnologías microfluídicas avanzadas. Si está interesado en 
                colaborar con nosotros o utilizar la plataforma NanoSynth en su investigación, no dude en contactarnos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90">
                <Mail className="w-4 h-4 mr-2" />
                Iniciar Colaboración
              </Button>
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Publicaciones
              </Button>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Instituciones Colaboradoras:</strong> Universidad Nacional de Colombia, 
                Instituto Tecnológico de Monterrey, Universidad de Chile, ETH Zurich, 
                MIT Microsystems Technology Laboratories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}