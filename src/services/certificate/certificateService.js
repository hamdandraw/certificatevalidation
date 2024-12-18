import { CertificateApi } from '../api/certificateApi';
import { validateCertificateData } from '../../utils/validation';

export class CertificateService {
  constructor(userId, isEmailVerified) {
    this.userId = userId;
    this.isEmailVerified = isEmailVerified;
  }

  async getCertificates() {
    try {
      const certificates = await CertificateApi.getAll();
      return certificates.map(cert => ({
        ...cert,
        date: cert.date ? new Date(cert.date).toISOString().split('T')[0] : '',
        isOwner: cert.userId === this.userId
      }));
    } catch (error) {
      console.error('Error in getCertificates:', error);
      throw new Error('Failed to fetch certificates');
    }
  }

  async createCertificate(certificateData) {
    if (!this.isEmailVerified) {
      throw new Error('Email verification required to create certificates');
    }

    const { isValid, errors } = validateCertificateData(certificateData);
    if (!isValid) {
      throw new Error(JSON.stringify(errors));
    }

    try {
      return await CertificateApi.create({
        ...certificateData,
        userId: this.userId
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw new Error('Failed to create certificate');
    }
  }

  async updateCertificate(id, certificateData) {
    if (!this.isEmailVerified) {
      throw new Error('Email verification required to update certificates');
    }

    const { isValid, errors } = validateCertificateData(certificateData);
    if (!isValid) {
      throw new Error(JSON.stringify(errors));
    }

    try {
      await CertificateApi.update(id, {
        ...certificateData,
        userId: this.userId
      });
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw new Error('Failed to update certificate');
    }
  }

  async deleteCertificate(id) {
    if (!this.isEmailVerified) {
      throw new Error('Email verification required to delete certificates');
    }

    try {
      await CertificateApi.delete(id);
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw new Error('Failed to delete certificate');
    }
  }
}