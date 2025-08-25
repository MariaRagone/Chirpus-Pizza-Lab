import axios from 'axios'

export async function askGrok(prompt: string, imageUrls?: string[]) {
  const t0 = Date.now()
  try {
    const res = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-2-mini',
        messages: [{ role: 'user', content: prompt + (imageUrls?.length ? `\nImages:\n${imageUrls.join('\n')}` : '') }],
        temperature: 0.3,
      },
      { headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` } }
    )
    const text: string = res.data?.choices?.[0]?.message?.content ?? ''
    const blocks = [{ type: 'text', text }]
    const mdImg = [...text.matchAll(/!\[(.*?)\]\((.*?)\)/g)].map(m => ({ alt: m[1], url: m[2] }))
    mdImg.forEach(i => blocks.push({ type: 'image', url: i.url, alt: i.alt } as any))
    return { provider: 'grok', ok: true, ms: Date.now() - t0, blocks }
  } catch (e: any) {
    return { provider: 'grok', ok: false, ms: Date.now() - t0, blocks: [], error: e?.message || 'Grok error' }
  }
}
