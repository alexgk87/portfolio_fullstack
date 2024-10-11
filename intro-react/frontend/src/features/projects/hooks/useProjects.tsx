import { useState, useCallback, useEffect } from "react";
import { ProjectProps } from "../../../../../shared/types";
import { ofetch } from "ofetch";
import { projectSchema } from "../helpers/validate";

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
      const projects: ProjectProps[] = response.data;
  
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
  
      // Validate the project data using Zod before sending it to the backend
      const validationResult = projectSchema.safeParse(project);
  
      if (!validationResult.success) {
        // If validation fails, log or set the validation errors
        console.error("Validation errors:", validationResult.error.errors);
        setError("Validation failed: " + validationResult.error.errors.map(err => err.message).join(", "));
        setLoading(false);
        return; // Stop the function execution if validation fails
      }
  
      // Proceed with the POST request if the validation is successful
      const response = await ofetch("http://localhost:3000/projects", {
        method: "POST",
        body: validationResult.data, // Use the validated data
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("New project added:", response);
  
      // Add the newly added project to the state
      setProjects((prevProjects) => [...prevProjects, response]);
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };
  /*const addProject = async (project: ProjectProps) => {
    try {
      setLoading(true);
      const response = await ofetch("http://localhost:3000/projects", {
        method: "POST",
        body: project,
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
  };*/

  // Delete a project
  const removeProject = async (id: string) => {
    try {
      setLoading(true);
      console.log(`Deleting project with id: ${id}`);
  
      const response = await ofetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });
  
      console.log("Delete response:", response);
  
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