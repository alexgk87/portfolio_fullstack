import { ofetch } from "ofetch";
import { ProjectProps } from "../../../../../shared/types";

const API_BASE_URL = "http://localhost:3000";

export const api = {
  fetchProjects: async (): Promise<ProjectProps[]> => {
    const response = await ofetch(`${API_BASE_URL}/projects`);
    return response.data;
  },

  addProject: async (project: ProjectProps): Promise<ProjectProps> => {
    const response = await ofetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      body: project,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  removeProject: async (id: string): Promise<void> => {
    await ofetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
    });
  },
};