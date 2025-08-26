import { useState } from 'react'
import { type ProviderResponse, aggregateQuery } from '../lib/api'

export default function QueryForm({
  onResults,
  onLoading,
}: {
  onResults: (r: ProviderResponse[]) => void
  onLoading: (b: boolean) => void
}) {
  const [prompt, setPrompt] = useState('Create a simple process flow and include an image if helpful.')
  const [imageUrls, setImageUrls] = useState('')
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    onLoading(true)
    try {
      const imgs = imageUrls.split(/\s+/).map(s => s.trim()).filter(Boolean)
      const res = await aggregateQuery(prompt, imgs)
      onResults(res.results)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      onLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow space-y-3">
      <label className="text-sm font-medium">Your inquiry</label>
      <textarea className="w-full border rounded p-2 min-h-[120px]"
        value={prompt} onChange={e => setPrompt(e.target.value)} />
      <label className="text-sm font-medium">Optional image URLs (space/newline separated)</label>
      <textarea className="w-full border rounded p-2 min-h-[60px]"
        placeholder="https://example.com/diagram.png"
        value={imageUrls} onChange={e => setImageUrls(e.target.value)} />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="px-4 py-2 rounded bg-primary text-white">Send</button>
    </form>
  )
}
