import { 
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { auth } from '../../config/firebase';

const reauthenticate = async (password) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No user is currently signed in');

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
};

export const updateUserEmail = async (user, newEmail, password) => {
  try {
    await reauthenticate(password);
    await updateEmail(user, newEmail);
    return { success: true };
  } catch (error) {
    console.error('Error updating email:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    await reauthenticate(currentPassword);
    await updatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/requires-recent-login':
      return 'Please sign in again to update your profile';
    case 'auth/email-already-in-use':
      return 'This email is already in use';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/wrong-password':
      return 'Current password is incorrect';
    default:
      return 'An error occurred. Please try again';
  }
};