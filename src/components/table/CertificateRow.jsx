import { formatDate } from '../../utils/dateUtils';
import { CertificateTableCell } from '../certificates/CertificateTableCell';
import { CertificateActions } from '../certificates/CertificateActions';

export const CertificateRow = ({ certificate, onEdit, onDelete }) => (
  <tr>
    <CertificateTableCell>{certificate.fullName}</CertificateTableCell>
    <CertificateTableCell>{certificate.serialNumber}</CertificateTableCell>
    <CertificateTableCell>{certificate.module}</CertificateTableCell>
    <CertificateTableCell>{certificate.level}</CertificateTableCell>
    <CertificateTableCell>{formatDate(certificate.date)}</CertificateTableCell>
    <CertificateActions
      onEdit={() => onEdit(certificate)}
      onDelete={() => onDelete(certificate.id)}
    />
  </tr>
);