import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ASHEN_SERVICES } from '../../core/constants/ashenServices';
import { BackgroundPaths } from '../animations/BackgroundPaths';
import './ThreeDCarousel.css';

interface ThreeDCarouselProps {
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  subtitle?: string;
  tagline?: string;
  isMobileSwipe?: boolean;
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
  title = "¡Conoce los servicios que ofrecemos!",
  subtitle = "Nuestras Soluciones",
  tagline = "Explora cómo nuestras tecnologías están revolucionando múltiples industrias con soluciones inteligentes adaptadas a necesidades específicas.",
}) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const minSwipeDistance = 50;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % ASHEN_SERVICES.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % ASHEN_SERVICES.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + ASHEN_SERVICES.length) % ASHEN_SERVICES.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "carousel-card-active";
    if (index === (active + 1) % ASHEN_SERVICES.length)
      return "carousel-card-next";
    if (index === (active - 1 + ASHEN_SERVICES.length) % ASHEN_SERVICES.length)
      return "carousel-card-prev";
    return "carousel-card-hidden";
  };

  return (
    <BackgroundPaths className="services-carousel-section" id="servicios">
      <div className="services-carousel-container">
        <div className="services-header">
          <h2 className="services-title">{title}</h2>
          <p className="services-subtitle">{subtitle}</p>
          <p className="services-tagline">{tagline}</p>
        </div>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="carousel-track">
            {ASHEN_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`carousel-card ${getCardAnimationClass(index)}`}
                style={{ height: `${cardHeight}px` }}
              >
                <div className="service-card">
                  <div
                    className="service-image-section"
                    style={{
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="service-image-overlay" />
                    <div className="service-image-content">
                      <h3 className="service-brand">
                        ASHEN
                      </h3>
                      <div className="service-brand-line" />
                      <p className="service-category">{service.title}</p>
                    </div>
                  </div>

                  <div className="service-content">
                    <h3 className="service-card-title">
                      {service.title}
                    </h3>
                    <p className="service-brand-text">
                      Desarrollo Profesional
                    </p>
                    <p className="service-description">
                      {service.description}
                    </p>

                    <div className="service-features-section">
                      <div className="service-tags">
                        {service.technologies.map((tech, idx) => (
                          <span key={idx} className="service-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="service-link"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <span>Conoce más</span>
                        <ArrowRight className="service-link-icon" />
                        <span className="service-link-underline"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                className="carousel-nav-btn carousel-nav-prev"
                onClick={() =>
                  setActive((prev) => (prev - 1 + ASHEN_SERVICES.length) % ASHEN_SERVICES.length)
                }
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="carousel-nav-btn carousel-nav-next"
                onClick={() => setActive((prev) => (prev + 1) % ASHEN_SERVICES.length)}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="carousel-dots">
            {ASHEN_SERVICES.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${active === idx ? 'active' : ''}`}
                onClick={() => setActive(idx)}
                aria-label={`Ir al servicio ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </BackgroundPaths>
  );
};

export default ThreeDCarousel;
