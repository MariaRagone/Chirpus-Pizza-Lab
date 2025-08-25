import type { ProviderResponse } from "../lib/api"

function Block({ b }: { b: any }) {
  if (b.type === 'image') {
    return <img src={b.url} alt={b.alt || 'image'} className="rounded-lg border w-full mt-3" />
  }
  return <p className="whitespace-pre-wrap leading-relaxed">{b.text}</p>
}

export default function ResultCard({ result }: { result: ProviderResponse }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="flex items-center justify-between">
        <h3 className="font-bold capitalize">{result.provider}</h3>
        <span className="text-xs text-slate-500">{result.ms} ms</span>
      </div>
      {!result.ok && <div className="text-red-600 text-sm">{result.error || 'Error'}</div>}
      {result.blocks.map((b, i) => <Block key={i} b={b} />)}
    </div>
  )
}
