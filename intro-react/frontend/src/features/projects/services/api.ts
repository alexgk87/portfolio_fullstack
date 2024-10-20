import { ProjectProps } from "../../../../../shared/types";
import { endpoints } from "../../../config/config";

export const api = {
    fetchProjects: async (url: string): Promise<ProjectProps[]> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      return data;
    },
    editProject: async (projectId: string, updatedProject: ProjectProps, url: string): Promise<void> => {
      const response = await fetch(`${url}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
    },
    addProject: async (project: ProjectProps, url: string): Promise<void> => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error("Failed to add project");
      }
    },
    deleteProject: async (projectId: string, url: string): Promise<void> => {
      const response = await fetch(`${url}/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
    },
  };