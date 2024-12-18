import { db } from '../../config/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc, 
  query, 
  orderBy,
  serverTimestamp,
  where 
} from 'firebase/firestore';

const COLLECTION = 'certificates';

export const CertificateApi = {
  getAll: async () => {
    try {
      const q = query(
        collection(db, COLLECTION),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};