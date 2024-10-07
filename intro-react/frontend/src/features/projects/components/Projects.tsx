import React, { useState, useEffect, useCallback } from "react";
import { ProjectProps } from "../../../../../shared/portfolio";
import placeholderImage from '../../../../img/placeholder-image.jpg';
import { ofetch } from "ofetch";
import CreateNewProject from "./CreateNewProject";

export function Projects() {
  // State to manage projects, loading status, and error messages
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  const fetchData = useCallback(async () => {
    try {
      console.time("fetching");
      console.log("fetching data ...");
      setLoading(true);

      const response = await ofetch('http://localhost:3000/projects');
      console.log("API response:", response);

      const projects: ProjectProps[] = response.data;
      setProjects(projects ?? []);

      console.log("... data fetched");
      console.timeEnd("fetching");

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to add a new project
  const addProject = (project: ProjectProps) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  // Function to delete a project
  const deleteProject = (index: number) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Projects</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>Total Projects: {projects.length}</p>
      
      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="relative group">
              <h3>{project.projectTitle}</h3>
              <div className="project-card">
                <img src={placeholderImage} alt={`${project.projectTitle} image`} className="w-full h-full object-cover"/>
                <p>{project.projectDescription}</p>
              </div>
              <div className="button-container">
                <button onClick={() => deleteProject(index)}>Delete</button>
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

export default Projects;
