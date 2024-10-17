import { useState, useCallback, useEffect } from "react";
import { ProjectProps } from "../../../../../shared/types";
import { projectSchema, newProjectSchema } from "../helpers/validate";
import { fetchProjects, addNewProject, deleteProject } from "../services/projectService";
import { endpoints } from "../../../config/config";

type Status = "idle" | "loading" | "error" | "success";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await fetchProjects(endpoints.projects);
      const fetchedProjects = Array.isArray(response) ? response : response.data;
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

      await addNewProject(newProject, endpoints.projects);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setLoading(false);
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project");
      setLoading(false);
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      setLoading(true);
      await deleteProject(projectId, endpoints.projects);
      setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
      setLoading(false);
    } catch (error) {
      console.error("Error removing project:", error);
      setError("Failed to remove project");
      setLoading(false);
    }
  };

  return { projects, status, addProject, removeProject, error };
}

export default useProjects;