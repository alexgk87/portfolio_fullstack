import { useState, useCallback, useEffect } from "react";
import { ProjectProps } from "../../../../../shared/types";
import { ofetch } from "ofetch";

type Status = "idle" | "loading" | "error" | "success";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Fetch projects from the API
  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await ofetch('http://localhost:3000/projects');
      const projects: ProjectProps[] = response.data; // Adjust this line if necessary
  
      // Make sure you are receiving the correct structure from the backend
      setProjects(projects ?? []);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("error");
      setError("Failed to fetch data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add a new project with the updated fields
  const addProject = async (project: ProjectProps) => {
    try {
      setLoading(true);
      const response = await ofetch("http://localhost:3000/projects", {
        method: "POST",
        body: project, // Ensure the project object is correctly serialized
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("New project added:", response);

      setProjects((prevProjects) => [...prevProjects, response]);
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (id: string) => {
    try {
      setLoading(true);
      console.log(`Deleting project with id: ${id}`); // Log the id being deleted
  
      const response = await ofetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });
  
      console.log("Delete response:", response); // Log the response from the server
  
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error removing project:", error);
      setError("Failed to remove project");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    projects,
    addProject,
    removeProject,
    error,
    status,
  };
}

export default useProjects;


/*import { useState, useCallback, useEffect } from "react";
import { ProjectProps } from '../../../../../shared/portfolio';
import { ofetch } from 'ofetch';

type Status = "idle" | "loading" | "error" | "success";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Fetch projects from the API
  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await ofetch("http://localhost:3000/projects");
      const projects: ProjectProps[] = response.data; // Assuming the response contains project data
      setProjects(projects ?? []);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("error");
      setError("Failed to fetch data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add a new project
  const addProject = async (project: ProjectProps) => {
    try {
      setLoading(true);
      const response = await ofetch("http://localhost:3000/projects", {
        method: "POST",
        body: project, // Send the project data in the body
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      });

      // Assuming the API returns the newly created project
      const newProject = await response.json();
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const removeProject = async (id: string) => {
    try {
      setLoading(true);
      await ofetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });

      // Remove the project from the state after successful deletion
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error removing project:", error);
      setError("Failed to remove project");
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    addProject,
    removeProject,
    error,
    status,
  };
}

export default useProjects;*/