import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileMenu } from '../profile/UserProfileMenu';
import { Logo } from './Logo';

export const Header = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const isValidationPage = location.pathname === '/validate';

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Axioo Sekar Agri Drone
              </h1>
              <p className="text-green-100 text-sm">
                Certificate Management System
              </p>
            </div>
          </div>
          
          {/* Profile and Sign Out buttons only shown on non-validation pages */}
          {!isValidationPage && (
            <div className="flex items-center space-x-4">
              <UserProfileMenu />
              <button
                onClick={signOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};