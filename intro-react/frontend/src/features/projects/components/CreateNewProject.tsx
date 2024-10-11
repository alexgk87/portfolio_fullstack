import { useState } from "react";
import { ProjectProps } from "../../../../../shared/types";
import React from "react";

type CreateNewProjectProps = {
  addProject: (project: ProjectProps) => void;
};

export default function CreateNewProject({ addProject }: CreateNewProjectProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [publicStatus, setPublicStatus] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [tags, setTags] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split the tags by commas and remove excess whitespace
    const tagArray = tags.split(',').map(tag => tag.trim());

    // Create the project object
    const newProject: ProjectProps = {
      id: crypto.randomUUID(),
      projectTitle: title,
      imageUrl: imageUrl,
      projectDescription: description,
      publishedAt: publishedAt || undefined,
      isPublic: publicStatus, 
      status: status,
      tags: tagArray,
    };

    addProject(newProject);

    // Reset form
    setTitle('');
    setImageUrl('');
    setDescription('');
    setPublishedAt('');
    setPublicStatus(false);
    setStatus('draft');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Project</h3>
      <div className="form-container">
        <label>
          Project Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Project Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Project Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Published At (Optional):
          <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
        </label>
        <label>
          Public:
          <input type="checkbox" checked={publicStatus} onChange={(e) => setPublicStatus(e.target.checked)} />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label>
          Tags (comma separated):
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
      </div>
      <div className="button-container">
        <button type="submit">Add Project</button>
      </div>
    </form>
  );
}