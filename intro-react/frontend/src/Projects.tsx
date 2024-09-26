import React from "react";
import { ProjectProps } from "../../shared/portfolio";

type ProjectsProps = {
  projects: ProjectProps[];
  deleteProject: (index: number) => void;
};

function Projects({ projects, deleteProject }: ProjectsProps) {
  const projectCount = projects.length;

  return (
    <div>
      <h2>Projects</h2>
      <p>Total Projects: {projectCount}</p>
      {projectCount > 0 ? (
        projects.map((project, index) => (
          <div key={index}>
            <h3>{project.projectTitle}</h3>
            <p>{project.projectDescription}</p>
            <button onClick={() => deleteProject(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}

export default Projects;
