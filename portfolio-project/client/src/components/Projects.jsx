import "./Projects.css";

import { ExternalLink, Github, Code, Database, Smartphone } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Task Management Application",
      description:
        "A full-stack CRUD application for managing daily tasks with user authentication, categories, and due date tracking.",
      technologies: ["React", "Node.js", "PostgreSQL", "JWT", "Express"],
      status: "In Progress",
      icon: <Code size={24} />,
      github: "#", // Replace with actual GitHub links
      demo: "#", // Replace with actual demo links
      features: [
        "User registration and authentication",
        "CRUD operations for tasks",
        "Task categories and filtering",
        "Due date notifications",
      ],
    },
    {
      id: 2,
      title: "Real-Time Chat Application",
      description:
        "Interactive chat platform with multiple rooms, real-time messaging, and user presence indicators using WebSocket technology.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      status: "Planned",
      icon: <Smartphone size={24} />,
      github: "#",
      demo: "#",
      features: [
        "Real-time messaging with Socket.io",
        "Multiple chat rooms",
        "Online user presence",
        "Message history storage",
      ],
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio website with glassmorphism design, contact form integration, and dynamic content management.",
      technologies: ["React", "Node.js", "Express", "Nodemailer"],
      status: "In Progress",
      icon: <Database size={24} />,
      github: "#",
      demo: "#",
      features: [
        "Responsive glassmorphism design",
        "Contact form with email integration",
        "Smooth scrolling navigation",
        "Modern animations and effects",
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#10b981"; // Green
      case "In Progress":
        return "#f59e0b"; // Amber
      case "Planned":
        return "#6366f1"; // Indigo
      default:
        return "#6b7280"; // Gray
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="glass content-card">
        <h2>Featured Projects</h2>
        <p className="projects-intro">
          Here are some projects I'm working on to demonstrate my full-stack
          development skills. Each project showcases different aspects of modern
          web development.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card glass">
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <div
                  className="project-status"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} />
                  View Code
                </a>
                <a
                  href={project.demo}
                  className="project-link primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-note glass">
          <h4>🚀 More Projects Coming Soon!</h4>
          <p>
            I'm actively building these projects as part of my portfolio
            development. Each project is designed to showcase different
            technical skills and solve real-world problems. Check back regularly
            for updates!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
