// src/components/AddLinkModal.jsx
import React, { useState } from 'react'
import { createLink } from '../api/api'

export default function AddLinkModal({ onClose, onCreated }) {
  const [targetUrl, setTargetUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setError('')
    if (!targetUrl) { setError('Please enter a URL'); return }
    setLoading(true)
    try {
      await createLink({ targetUrl, code: code || undefined })
      onClose()
      // optional: notify parent to refresh
      if (onCreated) onCreated()
      // fallback: reload
      setTimeout(() => window.location.reload(), 300)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="add-short-link" >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg flex justify-center font-semibold mb-4">Add Short Link</h3>
{/* className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 ">Long URL</label>
            <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)}
              className=" rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/long-url" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Short Code (optional)</label>
            <input value={code} onChange={e => setCode(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="6–8 characters (optional)" />
          </div>

          {error && <div className="text-red-600">{error}</div>}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-blue-600 text-white" disabled={loading}>
            {loading ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
