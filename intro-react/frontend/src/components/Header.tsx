import React from "react";

export const student = 'Alexander Karlsen';
export const degree = 'Bachelor IT';
export const points = 180;

type HeaderProps = {
    student: string;
    degree: string;
    points: number;
  };

export function Header({ student, degree, points }: HeaderProps) {
    return (
      <div>
        <h1>{student}</h1>
        <p>{degree}</p>
        <p>{points} points</p>
      </div>
    )
  }