import { ProjectProps } from "../../../../../shared/types";
import { api } from "./api";

export async function fetchProjects(url: string): Promise<ProjectProps[]> {
  return await api.fetchProjects(url);
}

export async function addNewProject(project: ProjectProps, url: string): Promise<void> {
  return await api.addProject(project, url);
}

export async function deleteProject(projectId: string, url: string): Promise<void> {
    return await api.deleteProject(projectId, url);
  }