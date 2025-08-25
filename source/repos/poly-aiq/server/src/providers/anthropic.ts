import axios from 'axios'

export async function askAnthropic(prompt: string, imageUrls?: string[]) {
  const t0 = Date.now()
  try {
    const content: any[] = [{ type: 'text', text: prompt }]
    if (imageUrls?.length) content.push({ type: 'text', text: `Images:\n${imageUrls.join('\n')}` })
    const res = await axios.post('https://api.anthropic.com/v1/messages',
      { model: 'claude-3-5-sonnet-20240620', max_tokens: 1024, messages: [{ role: 'user', content }] },
      { headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' } }
    )
    const text: string = res.data?.content?.[0]?.text ?? ''
    const blocks = [{ type: 'text', text }]
    const mdImg = [...text.matchAll(/!\[(.*?)\]\((.*?)\)/g)].map(m => ({ alt: m[1], url: m[2] }))
    mdImg.forEach(i => blocks.push({ type: 'image', url: i.url, alt: i.alt } as any))
    return { provider: 'claude', ok: true, ms: Date.now() - t0, blocks }
  } catch (e: any) {
    return { provider: 'claude', ok: false, ms: Date.now() - t0, blocks: [], error: e?.message || 'Anthropic error' }
  }
}
