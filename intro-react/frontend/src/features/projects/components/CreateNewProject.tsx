import { useState } from "react";
import { ProjectProps } from "../../../../../shared/portfolio";
import React from "react";

type CreateNewProjectProps = {
  addProject: (project: ProjectProps) => void;
};

export default function CreateNewProject({ addProject }: CreateNewProjectProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      return alert("Title and description are required!");
    }

    // Create a new project object and add it to the projects list
    const newProject: ProjectProps = {
      projectTitle: title,
      imageUrl: imageUrl || "",
      projectDescription: description,
    };

    addProject(newProject);

    // Clear the form after submission
    setTitle('');
    setImageUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Project</h3>
      <div className="form-container">
        <label>
          Project Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </label>
        <label>
          Project Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL (optional)"
          />
        </label>
        <label>
          Project Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            required
          />
        </label>
      </div>
      <div className="button-container">
        <button type="submit">Add Project</button>
      </div>
    </form>
  );
}