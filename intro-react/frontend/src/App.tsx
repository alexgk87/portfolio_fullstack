import React from "react";
import Projects from "./features/projects/components/Projects";
import { Header, student, degree, points } from './components/Header';
import { Experiences, experiences } from './components/Experiences';
import { Contact, email } from './components/Contact';
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experiences={experiences} />
      <Contact email={email} />
      <Projects />
    </div>
    </Layout>
  );
}

export default App;