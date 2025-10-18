export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export const team: TeamMember[] = [
  {
    name: "Juan Carlos",
    role: "CEO & Founder",
    bio: "Experto en estrategia tecnológica y liderazgo empresarial con más de 10 años de experiencia.",
    img: "/assets/team/juan-carlos.jpg"
  },
  {
    name: "María González",
    role: "CTO",
    bio: "Especialista en arquitectura de software y tecnologías emergentes.",
    img: "/assets/team/maria-gonzalez.jpg"
  },
  {
    name: "Carlos Rodríguez",
    role: "Lead Developer",
    bio: "Desarrollador full-stack con expertise en React, Node.js y cloud computing.",
    img: "/assets/team/carlos-rodriguez.jpg"
  },
  {
    name: "Ana Martínez",
    role: "UI/UX Designer",
    bio: "Diseñadora creativa especializada en experiencias de usuario y diseño de interfaces.",
    img: "/assets/team/ana-martinez.jpg"
  }
];
