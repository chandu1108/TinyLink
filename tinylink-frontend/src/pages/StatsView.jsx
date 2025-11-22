// src/pages/StatsView.jsx
import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchLink } from '../api/api'

export default function StatsView(){
  const { code } = useParams()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    setLoading(true)
    fetchLink(code).then(data=>{ setLink(data); setLoading(false) }).catch(err=>{ setError(err.message); setLoading(false) })
  }, [code])

  if(loading) return <div>Loading…</div>
  if(error) return <div className="text-red-600">{error}</div>
  if(!link) return <div>Not found</div>

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Stats — {link.code}</h3>
          <div className="text-sm text-slate-500">Created: {new Date(link.createdAt).toLocaleString()}</div>
        </div>
        <div>
          <Link to="/" className="text-sm text-slate-600 hover:underline">Back</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-md">
          <div className="text-sm text-slate-500">Target URL</div>
          <a className="text-sm text-blue-600 break-words" href={link.targetUrl} target="_blank" rel="noreferrer">{link.targetUrl}</a>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-slate-500">Total clicks</div>
          <div className="text-2xl font-semibold">{link.clicks}</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-sm text-slate-500">Last clicked</div>
          <div>{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</div>
        </div>
      </div>
    </div>
  )
}
