import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectProps } from "../../../../../shared/types";
import useProjects from "../hooks/useProjects";

const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, fetchASingleProject, updateProject } = useProjects();
  const [formData, setFormData] = useState<ProjectProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetchASingleProject(projectId);
    }
  }, [projectId, fetchASingleProject]);

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await updateProject(formData);
      navigate("/");
    }
  };

  if (!formData) return <p>Loading project data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Project</h2>
      <div>
        <label>Project Title</label>
        <input
          type="text"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Project Description</label>
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Project URL</label>
        <input
          type="text"
          name="projectUrl"
          value={formData.projectUrl}
          onChange={handleChange}
        />
      </div>
      {/* Add other fields as necessary */}
      <button type="submit">Update Project</button>
    </form>
  );
};

export default EditProject;
