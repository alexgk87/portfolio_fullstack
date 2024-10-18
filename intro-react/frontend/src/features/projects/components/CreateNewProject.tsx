import React from "react";
import { ProjectProps } from "../../../../../shared/types";
import { useCreateNewProject } from "../hooks/useCreateNewProject";

type CreateNewProjectProps = {
  addProject: (project: ProjectProps) => void;
};

export default function CreateNewProject({ addProject }: CreateNewProjectProps) {
  const initialFields = {
    projectTitle: "",
    imageUrl: "",
    projectDescription: "",
    publishedAt: "",
    isPublic: false,
    status: "draft" as "draft" | "published",
    tags: "",
    projectUrl: ""
  };

  const validate = (field: keyof typeof initialFields, value: string | boolean) => {
    if (field === 'projectTitle' && typeof value === 'string' && value.trim().length === 0) return false;
    return true;
  };

  const { handleSubmit, getFieldProps, isFieldInvalid } = useCreateNewProject({
    initialFields,
    onSubmit: (formData) => {
      const newProject: ProjectProps = {
        ...formData,
        id: crypto.randomUUID(),
        tags: typeof formData.tags === 'string' ? formData.tags.split(",").map(tag => tag.trim()) : [],
        isPublic: Boolean(formData.isPublic),
      };
      addProject(newProject);
    },
    validate,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Project</h3>
      <div className="form-container">
        <label>
          Project Title:
          <input type="text" {...getFieldProps('projectTitle')} />
          {isFieldInvalid('projectTitle') && <span>Title is required</span>}
        </label>
        <label>
          Project Image URL:
          <input type="text" {...getFieldProps('imageUrl')} />
        </label>
        <label>
          Project Description:
          <textarea {...getFieldProps('projectDescription')} />
        </label>
        <label>
          Published At (Optional):
          <input type="datetime-local" {...getFieldProps('publishedAt')} />
        </label>
        <label>
          Public:
          <input type="checkbox" {...getFieldProps('isPublic')} />
        </label>
        <label>
          Status:
          <select {...getFieldProps('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label>
          Tags (comma separated):
          <input type="text" {...getFieldProps('tags')} />
        </label>
        <label>
          Github URL:
          <input type="text" {...getFieldProps('projectUrl')} />
        </label>
      </div>
      <div className="button-container">
        <button type="submit">Add Project</button>
      </div>
    </form>
  );
}