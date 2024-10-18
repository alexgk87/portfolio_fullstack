import { ProjectProps } from "../../../../../shared/types";
import { endpoints } from "../../../config/config";
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

export async function fetchProjectById(projectId: string): Promise<ProjectProps> {
  const response = await fetch(`${endpoints.projects}/${projectId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${response.statusText}`);
  }
  const responseData = await response.json();
  console.log('Fetched project data:', responseData);
  
  if (responseData && responseData.data) {
    return responseData.data;
  } else {
    throw new Error('Project data not found in the response');
  }
}