// server/src/auth/firebaseAdmin.ts
import admin from 'firebase-admin'

function getCredential() {
  const blob = process.env.FIREBASE_SERVICE_ACCOUNT
  if (blob) {
    try {
      const json = blob.trim().startsWith('{')
        ? JSON.parse(blob)
        : JSON.parse(Buffer.from(blob, 'base64').toString('utf8'))
      return admin.credential.cert(json)
    } catch (e: any) {
      throw new Error(`FIREBASE_SERVICE_ACCOUNT is not valid JSON/base64: ${e?.message || e}`)
    }
  }
  // Separate envs path (make sure FIREBASE_PRIVATE_KEY has \n escapes in .env on Windows)
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin envs (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)')
  }
  return admin.credential.cert({ projectId, clientEmail, privateKey })
}

// Avoid “The default Firebase app already exists” during dev reloads
const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({ credential: getCredential() })

export function verifyIdToken(idToken: string) {
  return admin.auth(app).verifyIdToken(idToken)
}
