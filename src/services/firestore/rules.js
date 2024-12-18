export const firestoreRules = `
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /certificates/{certificateId} {
      // Basic security rules
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
`;