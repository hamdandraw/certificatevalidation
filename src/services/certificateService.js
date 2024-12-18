import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db, auth } from '../firebase';

const COLLECTION_NAME = 'certificates';

const checkAuth = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};

export const getCertificates = async () => {
  try {
    const user = checkAuth();
    const certificatesRef = collection(db, COLLECTION_NAME);
    const q = query(
      certificatesRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};

export const addCertificate = async (certificateData) => {
  try {
    const user = checkAuth();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...certificateData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding certificate:', error);
    throw error;
  }
};

export const updateCertificate = async (id, certificateData) => {
  try {
    checkAuth();
    const certificateRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(certificateRef, {
      ...certificateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    checkAuth();
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting certificate:', error);
    throw error;
  }
};