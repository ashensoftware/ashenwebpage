import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
// import About from './components/About';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Configurar el scroll suave para toda la aplicación
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevenir scroll horizontal
    const preventHorizontalScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventHorizontalScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', preventHorizontalScroll);
    };
  }, []);

  return (
    <div className="ashen-root">
      <div className="ashen-content">
        <NavBar />
        <Hero />
        <Timeline />
        <Projects />
        {/* <About /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
