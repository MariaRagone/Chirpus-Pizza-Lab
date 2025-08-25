import { Router, type Request, type Response } from 'express'
import { z } from 'zod'
import { askAnthropic } from '../providers/anthropic.js'
import { askGrok } from '../providers/grok.js'
import { askOpenAI } from '../providers/openai.js'
import { verifyIdToken } from '../auth/firebaseAdmin.js'

const schema = z.object({
  prompt: z.string().min(1),
  imageUrls: z.array(z.string().url()).optional(),
  idToken: z.string().min(10),
})

export const aggregateRouter = Router()

aggregateRouter.post('/', async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })

  const { prompt, imageUrls, idToken } = parsed.data
  try {
    const decoded = await verifyIdToken(idToken)
    const jobs = [askOpenAI(prompt, imageUrls), askAnthropic(prompt, imageUrls), askGrok(prompt, imageUrls)]
    const results = await Promise.allSettled(jobs)
    const out = results.map(r =>
      r.status === 'fulfilled' ? r.value : { provider: 'unknown', ok: false, ms: 0, blocks: [], error: (r as any).reason?.message || 'failed' }
    )
    res.json({ userId: decoded.uid, prompt, imageUrls, createdAt: new Date().toISOString(), results: out })
  } catch (e: any) {
    res.status(401).json({ error: e?.message || 'Unauthorized' })
  }
})
