import React, { useState } from "react";

type ProjectProps = {
  projectTitle: string;
  projectDescription: string;
};

type ExperiencesProps = {
  experienceName: string;
};

function Header({ student, degree, points }) {
  return (
    <div>
      <h1>{student}</h1>
      <p>{degree}</p>
      <p>{points} points</p>
    </div>
  )
}

function Experiences({ experiences }: { experiences :ExperiencesProps[] }) {
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.map((experience, index) => (
        <div key={index}>
          <p>{experience.experienceName}</p>
        </div>
      ))}
    </div>
  );
}


function Contact({ email }) {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null);

  const toggleEmailVisibility = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  const handleNameChange = (document: React.ChangeEvent<HTMLInputElement>) => {
    setName(document.target.value);
  };

  const handleMessageChange = (document: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(document.target.value);
  };

  const validateForm = () => {
    const newErrors: { name?: string; message?: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (document: React.FormEvent) => {
    document.preventDefault();
    if (validateForm()) {
      setSubmittedData({ name, message });
      setName("");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      {isEmailVisible ? (
        <div>
          <p>{email}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
              </label>
            </div>
            <div>
              <label>
                Message:
                <textarea value={message} onChange={handleMessageChange} />
                {errors.message && <span style={{ color: "red" }}>{errors.message}</span>}
              </label>
            </div>
            <button type="submit">Send</button>
          </form>
          <button onClick={toggleEmailVisibility}>Hide Contact</button>
          {submittedData && (
            <div>
              <h3>Submitted Data:</h3>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <button onClick={toggleEmailVisibility}>Show Contact</button>
      )}
    </div>
  );
}

function Projects({ projects }: { projects: ProjectProps[] }) {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index}>
          <h3>{project.projectTitle}</h3>
          <p>{project.projectDescription}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const student = 'Alexander Karlsen'
  const degree = 'Bachelor IT'
  const points = 180
  const experiences = [
    { experienceName: "Figma UI for customer X" },
    { experienceName: "Website for customer Y" },
  ];
  const email = 'student@hiof.no'
  const projects = [
    { projectTitle: 'Project A', projectDescription: 'Description of Project A' },
    { projectTitle: 'Project B', projectDescription: 'Description of Project B' },
  ];

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experiences={experiences} />
      <Contact email={email} />
      <React.Fragment>
        <Projects projects={projects} />
      </React.Fragment>
    </div>
  )
}

export default App