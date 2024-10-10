import React from "react";
import CreateNewProject from "./CreateNewProject";
import useProjects from "../hooks/useProjects";
import placeholderImage from '../../../../img/placeholder-image.jpg';

export function Projects() {
  const { projects, status, removeProject, addProject, error } = useProjects();

  const projectCount = projects.length;

  if (status === "loading") return <p>Loading projects...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Projects</h2>
      <p>Total Projects: {projectCount}</p>

      {projectCount > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="relative group">
              <h3>{project.projectTitle}</h3>
              <div className="project-card">
                <img
                  src={project.imageUrl || placeholderImage}
                  alt={`${project.projectTitle} image`}
                  className="w-full h-full object-cover"
                />
                <p>{project.projectDescription}</p>
                <p>
                  <strong>Published At:</strong> {project.publishedAt ? new Date(project.publishedAt).toLocaleDateString() : "Not published"}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Public:</strong> {project.public ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Tags:</strong> {Array.isArray(project.tags) ? project.tags.join(", ") : "No tags available"}
                </p>
              </div>
              <div className="button-container">
                <button onClick={() => removeProject(project.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects available.</p>
      )}

      <CreateNewProject addProject={addProject} />
    </div>
  );
}

export default Projects;


/*import React from "react";
import placeholderImage from '../../../../img/placeholder-image.jpg';
import CreateNewProject from "./CreateNewProject";
import useProjects from "../hooks/useProjects";

export function Projects() {
  const { projects, status, removeProject, addProject, error } = useProjects();

  const projectCount = projects.length;

  if (status === "loading") return <p>Loading projects...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Projects</h2>
      <p>Total Projects: {projectCount}</p>

      {projectCount > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="relative group">
              <h3>{project.projectTitle}</h3>
              <div className="project-card">
                <img
                  src={project.imageUrl || placeholderImage} // Use project-specific image or fallback to a default image
                  alt={`${project.projectTitle} image`}
                  className="w-full h-full object-cover"
                />
                <p>{project.projectDescription}</p>
              </div>
              <div className="button-container">
                <button onClick={() => removeProject(project.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects available</p>
      )}
      <CreateNewProject addProject={addProject} />
    </div>
  );
}

export default Projects;*/