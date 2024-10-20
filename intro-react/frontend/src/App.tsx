import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./features/projects/components/Projects";
import ProjectDetail from "./features/projects/components/ProjectDetail";
import { Header, student, degree, points } from './components/Header';
import { Experiences, experiences } from './components/Experiences';
import { Contact, email } from './components/Contact';
import Layout from "./components/Layout";
import EditProject from "./features/projects/components/EditProject";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/projects/:projectId/edit" element={<EditProject />} />
          <Route path="/" element={
            <div>
              <Header student={student} degree={degree} points={points} />
              <Experiences experiences={experiences} />
              <Contact email={email} />
              <Projects />
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;