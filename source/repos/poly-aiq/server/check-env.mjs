import 'dotenv/config'

console.log('cwd =', process.cwd())
const keys = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY']
for (const k of keys) {
  const v = process.env[k]
  if (k === 'FIREBASE_PRIVATE_KEY') {
    console.log(k, !!v, 'startsWith BEGIN?', (v || '').startsWith('-----BEGIN'))
  } else {
    console.log(k, v || '(missing)')
  }
}
