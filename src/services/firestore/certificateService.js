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
import { auth, db } from '../../config/firebase';
import { validateCertificateData } from '../../utils/validation';

const COLLECTION_NAME = 'certificates';

const checkAuth = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};

export const getCertificates = async () => {
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
};

export const addCertificate = async (certificateData) => {
  const user = checkAuth();
  
  const { isValid, errors } = validateCertificateData(certificateData);
  if (!isValid) throw new Error(JSON.stringify(errors));

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...certificateData,
    userId: user.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return docRef.id;
};

export const updateCertificate = async (id, certificateData) => {
  const user = checkAuth();
  
  const { isValid, errors } = validateCertificateData(certificateData);
  if (!isValid) throw new Error(JSON.stringify(errors));

  const certificateRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(certificateRef, {
    ...certificateData,
    userId: user.uid,
    updatedAt: serverTimestamp()
  });
};

export const deleteCertificate = async (id) => {
  checkAuth();
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};