import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import '../styles/NewHomePage.css';

export function NewHomePage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; animationDelay: string; animationDuration: string }>>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  // Generar partículas en estado al montar
  useEffect(() => {
    const particleCount = 30;
    const generated = Array.from({ length: particleCount }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 15 + 's',
      animationDuration: 15 + Math.random() * 10 + 's',
    }));
    setParticles(generated);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse move for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card');
      cards.forEach(card => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="microflow-container">
      {/* Hexagonal Grid Pattern */}
      <div className="hex-grid"></div>
      
      {/* Partículas animadas */}
      <div className="particles" ref={particlesRef}>
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{ left: p.left, top: p.top, animationDelay: p.animationDelay, animationDuration: p.animationDuration }}
          />
        ))}
      </div>


      {/* Hero Section */}
      <section className="hero">
        <div 
          className="floating-element circle-1"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        ></div>
        <div 
          className="floating-element circle-2"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        ></div>
        
        <div className="badge-custom">🔬 Innovación en Microfluídica</div>
        
        <h1 className="hero-title">
          El <span className="gradient-text">Futuro</span> de la<br/>
          <span className="gradient-text">Microfluídica</span>
        </h1>
        
        <p className="subtitle">
          Transformamos la ciencia en soluciones precisas. Desarrollamos 
          <span style={{ color: '#2FF8CE' }}> Lab-on-a-Chip</span>, 
          <span style={{ color: '#6AA5EB' }}> Dispositivos POC</span> y 
          <span style={{ color: '#2FF8CE' }}> Sistemas de Análisis</span> 
          {' '}que revolucionan el diagnóstico médico y la investigación científica.
        </p>
        
        <div className="hero-buttons">
          <button 
            className="primary-button"
            onClick={() => navigate('/simulation')}
          >
            Explorar Soluciones →
          </button>
          <button 
            className="secondary-button"
            onClick={() => navigate('/manufacturing')}
          >
            ▶ Ver Demo
          </button>
        </div>

        {/* Microfluidic Animation */}
        <div className="microfluidic-visual">
          <div className="flow-channel"></div>
          <div className="flow-channel"></div>
          <div className="flow-channel"></div>
          <div className="droplet" style={{ top: '30%', animationDelay: '0s' }}></div>
          <div className="droplet" style={{ top: '50%', animationDelay: '1.3s' }}></div>
          <div className="droplet" style={{ top: '70%', animationDelay: '2.6s' }}></div>
        </div>
        
        {/* Stats Section */}
        <div className="stats" ref={statsRef}>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Dispositivos Desarrollados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Patentes Registradas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5nm</div>
            <div className="stat-label">Precisión Nanométrica</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Soporte Técnico</div>
          </div>
        </div>
      </section>

      {/* Additional Sections from Original HomePage */}
      <section className="features-section">
        <div className="container mx-auto px-6">
          <h2 className="section-title gradient-text">Características Principales</h2>
          <div className="features-grid">
            <Card className="feature-card glass-effect">
              <div className="feature-icon">🧬</div>
              <h3>Simulación Avanzada</h3>
              <p>Genere diseños optimizados con IA</p>
              <Button 
                variant="ghost" 
                className="feature-button"
                onClick={() => navigate('/simulation')}
              >
                Explorar →
              </Button>
            </Card>
            <Card className="feature-card glass-effect">
              <div className="feature-icon">⚙️</div>
              <h3>Métodos de Manufactura</h3>
              <p>4 técnicas de fabricación disponibles</p>
              <Button 
                variant="ghost" 
                className="feature-button"
                onClick={() => navigate('/manufacturing')}
              >
                Explorar →
              </Button>
            </Card>
            <Card className="feature-card glass-effect">
              <div className="feature-icon">📊</div>
              <h3>Análisis de Datos</h3>
              <p>Procesamiento automatizado de imágenes</p>
              <Button 
                variant="ghost" 
                className="feature-button"
                onClick={() => navigate('/analysis')}
              >
                Explorar →
              </Button>
            </Card>
            <Card className="feature-card glass-effect">
              <div className="feature-icon">👥</div>
              <h3>Equipo Experto</h3>
              <p>Investigadores de clase mundial</p>
              <Button 
                variant="ghost" 
                className="feature-button"
                onClick={() => navigate('/authors')}
              >
                Explorar →
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
