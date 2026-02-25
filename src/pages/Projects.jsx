import { useState } from "react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projectList = [
    {
      title: "CaseKodiak",
      link: "https://case-kodiak.vercel.app/",
      description:
        "CaseKodiak is a full-stack eCommerce platform built with Next.js and TypeScript, leveraging the App Router and server components for a scalable architecture. It integrates Stripe Checkout with secure webhook verification to ensure reliable payment processing and order creation. Prisma ORM is used for type-safe database modeling with PostgreSQL, managing products, users, and orders with strong relational integrity. Authentication and role-based access control are implemented with Kinde to protect admin routes for product management, inventory updates, and order tracking.",
    },
    {
      title: "ChillNest",
      link: "https://chillnestweb.onrender.com/",
      description:
        "This full-stack Airbnb clone is a booking platform that lets users sign up, log in, and browse available stays using filters like date, location, and price. It features secure authentication with JWT, a responsive frontend built with React and CSS (Flexbox/Grid), and a backend powered by Node.js, Express, and MongoDB. An admin dashboard is included for managing listings and bookings, with all interactions handled through RESTful APIs.",
    },
    {
      title: "BlinkChat",
      link: "https://blinkchat-hymo.onrender.com/",
      description:
        "BlinkChat is a full-stack real-time chat application built with React, Node.js, Express, and MongoDB. It uses Socket.IO to enable instant messaging, typing indicators, and online/offline presence, with secure JWT-based authentication. Zustand is used on the frontend to manage and synchronize real-time state, while RESTful APIs handle users, messages, and conversations. The app is fully responsive and deployed on Render.",
    },
    {
      title: "Foodicpe",
      link: "https://shayan-food-app.vercel.app",
      description:
        "Foodicpe is a responsive front-end application built with React that connects to a public Food API, allowing users to search for food items using keywords. The app fetches and displays detailed information including ingredients, nutritional values, and recipes in real-time. Designed with modern CSS using Flexbox and Grid, it delivers a smooth and user-friendly experience across all devices, with seamless API integration through RESTful calls.",
    },
    {
      title: "To-Do Tracker",
      link: "https://shayan-todo-app.vercel.app",
      description:
        "ToDo Tracker is a management app that lets users add, edit, and delete tasks with deadlines. It includes visual indicators to track progress and filters to sort tasks by due date or completion. Built with React, Node.js, and Express, the UI uses modern CSS with Flexbox and Grid to ensure a clean, responsive experience across devices.",
    },
    {
      title: "Youtube Replica",
      link: "https://shayan-youtubereplica.vercel.app",
      description:
        "This YouTube replica highlights responsive design using HTML, CSS Flexbox, and Grid. It features a scalable layout with a dynamic video grid, adaptive sidebar, and media elements that adjust smoothly across all screen sizes. The project emphasizes clean, semantic HTML and modern CSS techniques to ensure a polished and consistent user experience on any device.",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green overflow-hidden">
      <div className="matrix-rain absolute inset-0 z-0"></div>

      <h2
        className="text-4xl font-matrix text-center mb-8 w-full glitch"
        data-text="My Projects"
      >
        My Projects
      </h2>

      <div
        className="projects-grid relative w-full px-8"
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(4, 1fr)",
          columnGap: "1rem",
        }}
      >
        {projectList.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            onMouseEnter={() => setActiveProject(proj)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <h3 className="btn-matrix">{proj.title}</h3>
          </a>
        ))}

        <div className={`project-desc-popup ${activeProject ? "visible" : ""}`}>
          {activeProject?.description}
        </div>
      </div>
    </section>
  );
};

export default Projects;
