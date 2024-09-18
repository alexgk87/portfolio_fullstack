import React from "react";

type ProjectProps = {
  projectTitle: string;
  projectDescription: string;
};

type ExperiencesProps = {
  experienceName: string;
};

function Header({ student, degree, points }) {
  return (
    <div>
      <h1>{student}</h1>
      <p>{degree}</p>
      <p>{points} points</p>
    </div>
  )
}

function Experiences({ experiences }: { experiences :ExperiencesProps[] }) {
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.map((experience, index) => (
        <div key={index}>
          <p>{experience.experienceName}</p>
        </div>
      ))}
    </div>
  );
}


function Contact({ email }) {
  return (
    <div>
      <h2>Contact</h2>
      <p>{email}</p>
    </div>
  )
}

function Projects({ projects }: { projects: ProjectProps[] }) {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index}>
          <h3>{project.projectTitle}</h3>
          <p>{project.projectDescription}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experiences = [
    { experienceName: "Figma UI for customer X" },
    { experienceName: "Website for customer Y" },
  ];
  const email = 'student@hiof.no'
  const projects = [
    { projectTitle: 'Project A', projectDescription: 'Description of Project A' },
    { projectTitle: 'Project B', projectDescription: 'Description of Project B' },
  ];

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experiences={experiences} />
      <Contact email={email} />
      <React.Fragment>
        <Projects projects={projects} />
      </React.Fragment>
    </div>
  )
}

export default App