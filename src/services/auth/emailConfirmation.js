import { 
  sendEmailVerification, 
  applyActionCode,
  checkActionCode
} from 'firebase/auth';
import { auth } from '../../config/firebase';

export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    return {
      success: true,
      message: 'Verification email sent successfully'
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email. Please try again.');
  }
};

export const verifyEmail = async (actionCode) => {
  try {
    // First check if the action code is valid
    await checkActionCode(auth, actionCode);
    // If valid, apply the verification
    await applyActionCode(auth, actionCode);
    return {
      success: true,
      message: 'Email verified successfully'
    };
  } catch (error) {
    console.error('Error verifying email:', error);
    throw new Error('Invalid or expired verification link');
  }
};