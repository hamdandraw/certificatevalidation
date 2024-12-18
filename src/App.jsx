import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CertificatesPage } from './pages/CertificatesPage';
import { ValidateCertificatePage } from './pages/ValidateCertificatePage';
import { LoginForm } from './components/auth/LoginForm';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import { useAuth } from './hooks/useAuth';
import { LoadingSpinner } from './components/shared/LoadingSpinner';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <CertificatesPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!user ? <LoginForm /> : <Navigate to="/" />} 
        />
        <Route 
          path="/verify-email" 
          element={<EmailVerificationPage />} 
        />
        <Route 
          path="/validate" 
          element={<ValidateCertificatePage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;