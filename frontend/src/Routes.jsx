import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import CreateRepo from './components/repo/CreateRepo';
import RepoDetail from './components/repo/RepoDetail';
import IssueDetail from './components/issue/IssueDetail';
import { useAuth } from "../authUtils";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/create-repo" element={
          <ProtectedRoute>
            <CreateRepo />
          </ProtectedRoute>
        } />
        
        <Route path="/repo/:id" element={
          <ProtectedRoute>
            <RepoDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/issue/:id" element={
          <ProtectedRoute>
            <IssueDetail />
          </ProtectedRoute>
        } />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;