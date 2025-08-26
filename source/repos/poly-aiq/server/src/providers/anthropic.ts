import axios from 'axios'

async function callAnthropic(model: string, prompt: string, imageUrls?: string[]) {
  return axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, ...(imageUrls?.length ? [{ type: 'text', text: `Images:\n${imageUrls.join('\n')}` }] : [])] }],
    },
    { headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' } }
  )
}

export async function askAnthropic(prompt: string, imageUrls?: string[]) {
  const t0 = Date.now()
  try {
    let res
    try {
      res = await callAnthropic('claude-3-5-sonnet-latest', prompt, imageUrls)
    } catch (e: any) {
      const status = e?.response?.status
      const msg = e?.response?.data?.error?.message || ''
      // Unknown model / no access → retry smaller model
      if (status === 400 && /model/i.test(msg)) {
        res = await callAnthropic('claude-3-haiku-latest', prompt, imageUrls)
      } else {
        throw e
      }
    }
    const text: string = res.data?.content?.[0]?.text ?? ''
    const blocks: any[] = [{ type: 'text', text }]
    for (const m of text.matchAll(/!\[(.*?)\]\((.*?)\)/g)) blocks.push({ type: 'image', url: m[2], alt: m[1] })
    return { provider: 'claude', ok: true, ms: Date.now() - t0, blocks }
  } catch (e: any) {
    const status = e?.response?.status
    const msg = e?.response?.data?.error?.message || e?.message || 'Anthropic error'
    return { provider: 'claude', ok: false, ms: Date.now() - t0, blocks: [], error: `${status ?? ''} ${msg}`.trim() }
  }
}
