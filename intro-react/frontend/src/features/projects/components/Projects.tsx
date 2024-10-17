import React from "react";
import CreateNewProject from "./CreateNewProject";
import useProjects from "../hooks/useProjects";
import placeholderImage from '../../../../img/placeholder-image.jpg';
import { ProjectProps } from "../../../../../shared/types";

export function Projects() {
  const { projects, status, removeProject, addProject, error } = useProjects();

  if (status === "loading") return <p>Loading projects...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  //console.log("Status:", status);
  //console.log("Projects array length:", projects.length);
  //console.log("Projects:", JSON.stringify(projects, null, 2));

  return (
    <div>
      <h2>Projects</h2>
      <p>Total Projects: {projects?.length || 0}</p>

      {projects && projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project: ProjectProps) => {
            return (
            <div key={project.id} className="relative group">
              <h3>{project.projectTitle}</h3>
              <div className="project-card">
                <img
                  src={project.imageUrl || placeholderImage}
                  alt={`${project.projectTitle} image`}
                  className="w-full h-full object-cover"
                />
                <p>{project.projectDescription}</p>
                <p className="published-field">
                  <strong>Published At:</strong> {project.publishedAt ? new Date(project.publishedAt).toLocaleDateString() : "Not published"}
                </p>
                <p className="status-field">
                  <strong>Status:</strong> {project.status}
                </p>
                <p className="isPublic-field">
                  <strong>Public:</strong> {project.isPublic ? "Yes" : "No"}
                </p>
                <p className="tags-field">
                  <strong>Tags:</strong> {Array.isArray(project.tags) ? project.tags.join(", ") : "No tags available"}
                </p>
              </div>
              <div className="button-container">
                <button onClick={() => removeProject(project.id)}>Delete</button>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <p>No projects available.</p>
      )}

      <CreateNewProject addProject={addProject} />
    </div>
  );
}

export default Projects;