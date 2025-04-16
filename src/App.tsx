import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="ashen-root">
      <NavBar />
      <Hero />
      <Timeline />
      <Projects />
      <About />
      <Footer />
    </div>
  );
}

export default App;
