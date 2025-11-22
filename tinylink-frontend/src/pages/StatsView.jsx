import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchLink } from '../api/api'


export default function StatsView(){
  const { code } = useParams()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    fetchLink(code)
      .then(data => { setLink(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [code])

  if(loading) return <div>Loading…</div>
  if(error) return <div className="text-red-600">{error}</div>

  return (
    <div  className="text-blue-50 bg-blue-200 rounded-xl flex flex-col shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">{code}</h2>
      <p className="text-blue-700 break-words"><b>Target URL:</b> <a href={link.targetUrl} className="text-blue-600 hover:underline">{link.targetUrl}</a></p>
      <p className="mt-2"><b>Total Clicks:</b> {link.clicks}</p>
      <p><b>Last Clicked:</b> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</p>

      <Link to="/" className="text-sm text-blue-600 hover:underline mt-6 inline-block">← Back to dashboard</Link>
    </div>
  )
}
