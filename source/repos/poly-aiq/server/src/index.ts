import express from 'express'
import { aggregateRouter } from './routes/aggregate.js'
import { env } from 'process'

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }))
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api/aggregate', aggregateRouter)
app.listen(env.PORT, () => console.log(`[server] listening on :${env.PORT}`))
function cors(arg0: { origin: string | undefined; credentials: boolean }): any {
    throw new Error('Function not implemented.')
}

