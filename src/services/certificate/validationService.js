import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const validateCertificate = async (serialNumber) => {
  try {
    const certificatesRef = collection(db, 'certificates');
    const q = query(
      certificatesRef,
      where('serialNumber', '==', serialNumber.trim())
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error('Certificate not found. Please check the serial number and try again.');
    }

    const certificate = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    };

    return {
      fullName: certificate.fullName,
      serialNumber: certificate.serialNumber,
      module: certificate.module,
      level: certificate.level,
      date: certificate.date
    };
  } catch (error) {
    console.error('Error validating certificate:', error);
    throw new Error('Failed to validate certificate. Please try again later.');
  }
};