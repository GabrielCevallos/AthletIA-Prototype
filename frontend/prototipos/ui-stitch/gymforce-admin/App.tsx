import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import CreateExercise from './pages/CreateExercise';
import ExerciseDetail from './pages/ExerciseDetail';
import MemberProfile from './pages/MemberProfile';
import RoutineCreator from './pages/RoutineCreator';
import UploadMedia from './pages/UploadMedia';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/new" element={<CreateExercise />} />
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          <Route path="/members" element={<MemberProfile />} />
          <Route path="/routines" element={<RoutineCreator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
