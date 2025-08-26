// server/src/auth/firebaseAdmin.ts
import admin from 'firebase-admin'
import { env } from '../env.js'

function getCredential() {
  const blob = process.env.FIREBASE_SERVICE_ACCOUNT
  if (blob) {
    try {
      const json = blob.trim().startsWith('{')
        ? JSON.parse(blob)
        : JSON.parse(Buffer.from(blob, 'base64').toString('utf8'))
      // sanity check the minimal fields
      if (json.project_id && json.client_email && json.private_key) {
        return admin.credential.cert(json)
      }
      console.warn('FIREBASE_SERVICE_ACCOUNT present but missing fields, falling back to separate env vars.')
    } catch {
      console.warn('FIREBASE_SERVICE_ACCOUNT is not valid JSON/base64, falling back to separate env vars.')
    }
  }
  return admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
  })
}

const app = admin.apps.length ? admin.app() : admin.initializeApp({ credential: getCredential() })
export function verifyIdToken(idToken: string) { return admin.auth(app).verifyIdToken(idToken) }
