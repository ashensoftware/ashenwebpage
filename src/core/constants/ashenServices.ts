export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
}

export const ASHEN_SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Desarrollo Web',
    description: 'Creamos sitios web y aplicaciones que funcionan perfectamente en cualquier dispositivo. Desde páginas corporativas hasta plataformas complejas, hacemos que tu presencia digital sea profesional y efectiva.',
    image: '/assets/services/web.jpg',
    features: [
      'Sitios web responsivos y modernos',
      'Optimización para buscadores',
      'Experiencia de usuario intuitiva',
      'Integración con redes sociales'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 'mobile-development',
    title: 'Aplicaciones Móviles',
    description: 'Desarrollamos aplicaciones para smartphones y tablets que tus clientes pueden descargar desde las tiendas oficiales. Soluciones que funcionan tanto en Android como en iPhone.',
    image: '/assets/services/mobile.jpg',
    features: [
      'Apps para Android e iPhone',
      'Diseño intuitivo y atractivo',
      'Funcionalidad offline',
      'Notificaciones push'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  },
  {
    id: 'desktop-apps',
    title: 'Aplicaciones de Escritorio',
    description: 'Creamos programas para computadoras que se instalan directamente en Windows, Mac o Linux. Perfectas para empresas que necesitan herramientas específicas para su trabajo diario.',
    image: '/assets/services/desktop.jpg',
    features: [
      'Programas para Windows, Mac y Linux',
      'Interfaz fácil de usar',
      'Integración con sistemas existentes',
      'Actualizaciones automáticas'
    ],
    technologies: ['Electron', 'Tauri', 'Qt', 'WPF']
  },
  {
    id: 'iot-solutions',
    title: 'Internet de las Cosas (IoT)',
    description: 'Conectamos dispositivos inteligentes a internet para automatizar tu hogar o negocio. Desde sensores hasta sistemas de control, hacemos que la tecnología trabaje para ti.',
    image: '/assets/services/iot.jpg',
    features: [
      'Dispositivos conectados',
      'Monitoreo en tiempo real',
      'Automatización inteligente',
      'Control remoto'
    ],
    technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'LoRaWAN']
  },
  {
    id: 'game-development',
    title: 'Desarrollo de Videojuegos',
    description: 'Creamos videojuegos desde cero para móviles, computadoras y consolas. Desde juegos casuales hasta experiencias inmersivas, llevamos tu visión a la realidad.',
    image: '/assets/services/games.jpg',
    features: [
      'Juegos para móviles y PC',
      'Gráficos atractivos',
      'Mecánicas divertidas',
      'Multiplataforma'
    ],
    technologies: ['Unity', 'Unreal Engine', 'Godot', 'Phaser']
  },
  {
    id: 'artificial-intelligence',
    title: 'Inteligencia Artificial',
    description: 'Implementamos sistemas inteligentes que pueden aprender y tomar decisiones. Desde chatbots hasta análisis predictivo, la IA puede revolucionar tu negocio.',
    image: '/assets/services/ai.jpg',
    features: [
      'Chatbots inteligentes',
      'Análisis predictivo',
      'Reconocimiento de patrones',
      'Automatización de procesos'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI']
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Desarrollamos sistemas que aprenden de los datos para mejorar continuamente. Perfecto para empresas que quieren aprovechar su información para tomar mejores decisiones.',
    image: '/assets/services/ml.jpg',
    features: [
      'Análisis de datos avanzado',
      'Predicciones precisas',
      'Detección de patrones',
      'Recomendaciones personalizadas'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy']
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Creamos redes neuronales avanzadas que pueden procesar información compleja como imágenes, texto y audio. Ideal para proyectos que requieren análisis sofisticado.',
    image: '/assets/services/deep-learning.jpg',
    features: [
      'Procesamiento de imágenes',
      'Análisis de texto avanzado',
      'Reconocimiento de voz',
      'Sistemas de recomendación'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV']
  },
  {
    id: 'data-science',
    title: 'Ciencia de Datos',
    description: 'Transformamos tus datos en información valiosa que impulsa decisiones inteligentes. Desde reportes automáticos hasta dashboards interactivos, hacemos que los números hablen.',
    image: '/assets/services/data-science.jpg',
    features: [
      'Análisis de datos empresariales',
      'Dashboards interactivos',
      'Reportes automáticos',
      'Visualizaciones claras'
    ],
    technologies: ['Python', 'R', 'Tableau', 'Power BI']
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    description: 'Implementamos tecnología blockchain para crear sistemas seguros y transparentes. Perfecto para empresas que necesitan trazabilidad, contratos inteligentes o criptomonedas.',
    image: '/assets/services/blockchain.jpg',
    features: [
      'Contratos inteligentes',
      'Sistemas de trazabilidad',
      'Tokens y criptomonedas',
      'Seguridad avanzada'
    ],
    technologies: ['Solidity', 'Web3', 'Ethereum', 'IPFS']
  },
  {
    id: 'automation',
    title: 'Automatización',
    description: 'Automatizamos procesos repetitivos para que tu equipo se enfoque en lo importante. Desde tareas administrativas hasta flujos de trabajo complejos, la tecnología trabaja 24/7.',
    image: '/assets/services/automation.jpg',
    features: [
      'Automatización de procesos',
      'Integración de sistemas',
      'Flujos de trabajo inteligentes',
      'Reducción de errores'
    ],
    technologies: ['Python', 'Zapier', 'Microsoft Power Automate', 'RPA']
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return ASHEN_SERVICES.find(service => service.id === id);
};

export const getServicesCount = (): number => {
  return ASHEN_SERVICES.length;
};
