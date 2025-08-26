import { auth } from "./firebase";

export type ProviderName = 'chatgpt' | 'claude' | 'grok'
export type Block =
  | { type: 'text'; text: string }
  | { type: 'image'; url: string; alt?: string }
export type ProviderResponse = {
  provider: ProviderName
  ok: boolean
  ms: number
  blocks: Block[]
  error?: string
}

export async function aggregateQuery(prompt: string, imageUrls: string[]) {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')
  const idToken = await user.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/aggregate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, imageUrls, idToken }),
  })
  if (!res.ok) throw new Error(`Server error ${res.status}`)
  return (await res.json()) as { results: ProviderResponse[] }
}
