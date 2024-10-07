import React from "react";
import { useState } from "react";

export const email = 'student@hiof.no';

type EmailProps = {
    email: string;
  };

export function Contact({ email }: EmailProps) {
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
            <h3>{email}</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-container">
                <label>
                  Name:
                  <input type="text" value={name} onChange={handleNameChange} />
                  {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                </label>
  
                <label>
                  Message:
                  <textarea value={message} onChange={handleMessageChange} />
                  {errors.message && <span style={{ color: "red" }}>{errors.message}</span>}
                </label>
              </div>
              <div className="button-container">
                <button type="submit">Send</button>
              </div>
            </form>
            <div className="button-container">
              <button onClick={toggleEmailVisibility}>Hide Contact</button>
            </div>
            {submittedData && (
              <div>
                <h3>Submitted Data:</h3>
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <div className="button-container">
            <button onClick={toggleEmailVisibility}>Show Contact</button>
          </div>
        )}
      </div>
    );
  }