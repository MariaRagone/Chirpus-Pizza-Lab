import { Router } from 'express'
import axios from 'axios'

export const selftestRouter = Router()
selftestRouter.get('/', async (_req, res) => {
  const out: Record<string, any> = {}
  async function probe(name: string, fn: () => Promise<any>) {
    const t0 = Date.now()
    try { await fn(); out[name] = { ok: true, ms: Date.now() - t0 } }
    catch (e: any) {
      out[name] = { ok: false, ms: Date.now() - t0, status: e?.response?.status, message: e?.response?.data?.error?.message || e?.message }
    }
  }
  await probe('openai', () => axios.post('https://api.openai.com/v1/chat/completions',
    { model: 'gpt-4o-mini', messages: [{ role: 'user', content: 'ping' }] },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }))
  await probe('anthropic', () => axios.post('https://api.anthropic.com/v1/messages',
    { model: 'claude-3-haiku-latest', max_tokens: 16, messages: [{ role: 'user', content: [{ type: 'text', text: 'ping' }] }] },
    { headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' } }))
  await probe('xai', () => axios.post('https://api.x.ai/v1/chat/completions',
    { model: 'grok-2-mini', messages: [{ role: 'user', content: 'ping' }] },
    { headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` } }))
  res.json(out)
})
