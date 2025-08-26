import axios from 'axios'

async function callXAI(model: string, prompt: string, imageUrls?: string[]) {
  return axios.post(
    'https://api.x.ai/v1/chat/completions',
    {
      model,
      messages: [{ role: 'user', content: prompt + (imageUrls?.length ? `\nImages:\n${imageUrls.join('\n')}` : '') }],
      temperature: 0.3,
    },
    { headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` } }
  )
}

export async function askGrok(prompt: string, imageUrls?: string[]) {
  const t0 = Date.now()
  try {
    let res
    try {
      res = await callXAI('grok-2-latest', prompt, imageUrls)
    } catch (e: any) {
      const status = e?.response?.status
      // 403 often means no access to the larger model; try mini
      if (status === 403) {
        res = await callXAI('grok-2-mini', prompt, imageUrls)
      } else {
        throw e
      }
    }
    const text: string = res.data?.choices?.[0]?.message?.content ?? ''
    const blocks: any[] = [{ type: 'text', text }]
    for (const m of text.matchAll(/!\[(.*?)\]\((.*?)\)/g)) blocks.push({ type: 'image', url: m[2], alt: m[1] })
    return { provider: 'grok', ok: true, ms: Date.now() - t0, blocks }
  } catch (e: any) {
    const status = e?.response?.status
    const msg = e?.response?.data?.error?.message || e?.message || 'Grok error'
    return { provider: 'grok', ok: false, ms: Date.now() - t0, blocks: [], error: `${status ?? ''} ${msg}`.trim() }
  }
}
