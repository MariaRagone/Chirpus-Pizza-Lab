import admin from 'firebase-admin'

function getCredential() {
  const blob = process.env.FIREBASE_SERVICE_ACCOUNT
  if (blob) {
    const json = blob.trim().startsWith('{')
      ? JSON.parse(blob)
      : JSON.parse(Buffer.from(blob, 'base64').toString('utf8'))
    return admin.credential.cert(json)
  }
  return admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  })
}

const app = admin.initializeApp({ credential: getCredential() })
export function verifyIdToken(idToken: string) { return admin.auth(app).verifyIdToken(idToken) }
