import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { project, loading, error, fetchASingleProject } = useProjects();
    
    useEffect(() => {
      if (projectId) {
        console.log('Fetching project with ID:', projectId);
        fetchASingleProject(projectId);
      }
    }, [projectId, fetchASingleProject]);

    useEffect(() => {
        console.log('Current project state:', project);
      }, [project]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h1>{project?.projectTitle}</h1>
        <p>{project?.projectDescription}</p>
        {project?.imageUrl && <img src={project.imageUrl} alt={project.projectTitle} style={{ maxWidth: "100%" }} />}
        <p>Status: {project?.status}</p>
        <p>Published At: {project?.publishedAt}</p>
        <p>Public: {project?.isPublic ? "Yes" : "No"}</p>
        {project?.tags && (
          <ul>
            {project.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        )}
        {project?.projectUrl && (
          <p>
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              Project URL
            </a>
          </p>
        )}
      </div>
    );
  };
  
  export default ProjectDetail;