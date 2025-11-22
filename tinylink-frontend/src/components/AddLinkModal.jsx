import React, {useState} from 'react'
import { createLink } from '../api/api'

export default function AddLinkModal({ onClose }){
  const [targetUrl, setTargetUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setLoading(true)
    setError('')
    try{
      await createLink({ targetUrl, code: code || undefined })
      onClose()
      setTimeout(()=>window.location.reload(), 200)
    }catch(e){ setError(e.message) }
    setLoading(false)
  }

  return (
    <div className=" fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Add Short Link</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Long URL</label>
            <input value={targetUrl} onChange={e=>setTargetUrl(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/long-url" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Short Code (optional)</label>
            <input value={code} onChange={e=>setCode(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="6-8 characters" />
          </div>

          {error && <div className="text-red-600">{error}</div>}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            {loading ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
