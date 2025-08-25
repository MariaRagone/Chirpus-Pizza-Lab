import { useState } from 'react'
import QueryForm from './components/QueryForm'
import ResultCard from './components/ResultCard'
import type { ProviderResponse } from './lib/api'

export default function Dashboard() {
  const [results, setResults] = useState<ProviderResponse[] | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Ask once. See them all.</h1>
      <QueryForm onResults={setResults} onLoading={setLoading} />
      {loading && <div className="text-slate-600">Querying providers…</div>}
      <div className="grid md:grid-cols-3 gap-4">
        {results?.map(r => <ResultCard key={r.provider} result={r} />)}
      </div>
    </section>
  )
}
