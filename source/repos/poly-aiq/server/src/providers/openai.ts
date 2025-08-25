import axios from 'axios'

export async function askOpenAI(prompt: string, imageUrls?: string[]) {
  const t0 = Date.now()
  try {
    const messages: any[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ]
    if (imageUrls?.length) messages.push({ role: 'user', content: `Relevant images:\n${imageUrls.join('\n')}` })

    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-4o-mini', messages, temperature: 0.3 },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    )

    const text: string = res.data.choices?.[0]?.message?.content ?? ''
    const blocks: any[] = [{ type: 'text', text }]
    for (const m of text.matchAll(/!\[(.*?)\]\((.*?)\)/g)) {
      blocks.push({ type: 'image', url: m[2], alt: m[1] })
    }
    return { provider: 'chatgpt', ok: true, ms: Date.now() - t0, blocks }
  } catch (e: any) {
    return { provider: 'chatgpt', ok: false, ms: Date.now() - t0, blocks: [], error: e?.message || 'OpenAI error' }
  }
}
