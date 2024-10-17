import { useState, useCallback, useEffect } from "react";
import { ProjectProps } from "../../../../../shared/types";
import { projectSchema, newProjectSchema } from "../helpers/validate";
import { api } from "../services/api";

type Status = "idle" | "loading" | "error" | "success";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const fetchedProjects = await api.fetchProjects();
      setProjects(fetchedProjects ?? []);
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

  const addProject = async (project: Omit<ProjectProps, 'id'>) => {
    try {
      setLoading(true);
  
      // Zod validation
      const validationResult = newProjectSchema.safeParse(project);
  
      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors);
        setError("Validation failed: " + validationResult.error.errors.map(err => err.message).join(", "));
        return;
      }
  
      const newProject: ProjectProps = {
        ...validationResult.data,
        id: crypto.randomUUID(),
      };
  
      const createdProject = await api.addProject(newProject);
  
      console.log("New project added:", createdProject);
  
      setProjects((prevProjects) => [...prevProjects, createdProject]);
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
      console.log(`Deleting project with id: ${id}`);
  
      await api.removeProject(id);
  
      console.log("Project deleted successfully");
  
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