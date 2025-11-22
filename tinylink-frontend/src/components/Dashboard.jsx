// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { fetchLinks, deleteLink, BASE } from '../api/api'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const data = await fetchLinks()
      setLinks(data)
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onDelete = async (code) => {
    if (!confirm('Delete this link?')) return
    try {
      await deleteLink(code)
      await load()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    }
  }

  if (loading) return <div className="py-8 text-center">Loading…</div>
  if (error) return <div className="text-red-600 py-4">{error}</div>

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-700">
              <th className="py-3 px-4 font-semibold">Short Code</th>
              <th className="py-3 px-4 font-semibold">Target URL</th>
              <th className="py-3 px-4 font-semibold">Total Clicks</th>
              <th className="py-3 px-4 font-semibold">Last Clicked</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map(l => (
              <tr key={l.code} className="border-t">
                <td className="py-3 px-4 align-top">
                  {/* IMPORTANT: open backend redirect so clicks are counted by server */}
                  <a
                    href={`${BASE}/${encodeURIComponent(l.code)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {l.code}
                  </a>
                </td>

                <td className="py-3 px-4 text-gray-700 break-words max-w-[60ch]">{l.targetUrl}</td>

                <td className="py-3 px-4 align-top">{l.clicks ?? 0}</td>
                <td className="py-3 px-4 align-top">
                  {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}
                </td>
                <td className="py-3 px-4 align-top space-x-3">
                  <Link to={`/stats/${l.code}`} className="text-sm text-blue-600 hover:underline">Stats</Link>
                  <button onClick={() => onDelete(l.code)} className="px-3 py-1 rounded-md bg-red-600 text-white text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
