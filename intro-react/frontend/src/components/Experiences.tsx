import React from "react";

export const experiences = [
    { experienceName: 'Portfolio project' },
    { experienceName: 'Mobile app' },
  ];

type ExperiencesProps = {
    experienceName: string;
  };

export function Experiences({ experiences }: { experiences :ExperiencesProps[] }) {
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.length !== 0 ? (
        experiences.map((experience, index) => (
          <div key={index}>
            <p>{experience.experienceName}</p>
          </div>
        ))
      ) : (
        <p>No experiences yet.</p>
      )}
    </div>
  );
}