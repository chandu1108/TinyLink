// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { fetchLinks, deleteLink } from '../api/api'
import { Link as RouterLink } from 'react-router-dom'
import { BASE } from '../api/api'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <button onClick={onCopy} className="text-sm px-2 py-1 border rounded-md hover:bg-slate-50">
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function Dashboard({ onRefresh }) {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load(){
    setLoading(true)
    try{
      const data = await fetchLinks()
      setLinks(data)
      setError('')
    } catch (e){
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  const handleDelete = async (code) => {
    if (!confirm('Delete this link?')) return
    try {
      await deleteLink(code)
      // remove immediately
      setLinks(prev => prev.filter(l => l.code !== code))
      if (onRefresh) onRefresh()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    }
  }

  if (loading) return <div className="py-12 text-center text-slate-500">Loading links…</div>
  if (error) return <div className="text-red-600 py-6">{error}</div>

  return (
    <div id='container' className="space-y-6">
      {/* summary row */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-slate-500 text-sm">Total links</div>
          <div className="text-2xl font-semibold">{links.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-slate-500 text-sm">Total clicks</div>
          <div className="text-2xl font-semibold">{links.reduce((s, l) => s + (l.clicks || 0), 0)}</div>
        </div>
        <div className="card p-4">
          <div className="text-slate-500 text-sm">Last created</div>
          <div className="text-2xl font-semibold">{links[0] ? new Date(links[0].createdAt).toLocaleString() : '-'}</div>
        </div>
      </div> */}

      {/* table / list */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-compact">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left">Short</th>
                <th className="text-left">Target URL</th>
                <th className="text-left">Clicks</th>
                <th className="text-left">Last Clicked</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map(l => (
                <tr key={l.code} className="border-t">
                  <td className="py-3 px-4 align-top">
                    <a className="text-blue-600 font-medium hover:underline" href={`${BASE}/${encodeURIComponent(l.code)}`} target="_blank" rel="noreferrer">
                      {l.code}
                    </a>
                    <div className="text-xs text-slate-400 mt-1">{new Date(l.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4 max-w-[40ch] break-words text-slate-700">{l.targetUrl}</td>
                  <td className="py-3 px-4 align-top">{l.clicks ?? 0}</td>
                  <td className="py-3 px-4 align-top">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}</td>
                  <td className="py-3 px-4 align-top space-x-2">
                    <RouterLink to={`/stats/${l.code}`} className="text-sm text-slate-700 hover:underline">Stats</RouterLink>
                    <CopyButton text={`${BASE}/${encodeURIComponent(l.code)}`} />
                    <button onClick={() => handleDelete(l.code)} className="text-sm px-2 py-1 rounded-md bg-red-600 text-white">Delete</button>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">No links yet — add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
