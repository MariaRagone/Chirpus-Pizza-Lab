import 'dotenv/config'

function req(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env ${name}`)
  return v
}

export const env = {
  PORT: Number(process.env.PORT ?? 8787),

  // Firebase Admin (read from environment, not hard-coded)
  FIREBASE_PROJECT_ID: req('FIREBASE_PROJECT_ID'),
  FIREBASE_CLIENT_EMAIL: req('FIREBASE_CLIENT_EMAIL'),
  FIREBASE_PRIVATE_KEY: req('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),

  // Provider keys
  OPENAI_API_KEY: req('OPENAI_API_KEY'),
  ANTHROPIC_API_KEY: req('ANTHROPIC_API_KEY'),
  XAI_API_KEY: req('XAI_API_KEY'),

  // CORS
  CORS_ORIGINS: (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim()),
}
