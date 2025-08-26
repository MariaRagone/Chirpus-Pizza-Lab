import 'dotenv/config'
import express from 'express'
import cors from 'cors'                  
import { env } from './env.js'
import { aggregateRouter } from './routes/aggregate.js'
import { selftestRouter } from './routes/selftest.js'
app.use('/api/selftest', selftestRouter)

const app = express()
app.use(express.json({ limit: '2mb' }))

const corsOptions: cors.CorsOptions = {
  origin: env.CORS_ORIGINS,             
  credentials: true,
}
app.use(cors(corsOptions))               

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api/aggregate', aggregateRouter)
app.listen(env.PORT, () => console.log(`[server] listening on :${env.PORT}`))

