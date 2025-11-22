import React, {useEffect, useState} from 'react'
import { fetchLinks, deleteLink, BASE } from '../api/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load(){
    setLoading(true)
    try{
      const data = await fetchLinks()
      setLinks(data)
    }catch(e){ setError(e.message) }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  const onDelete = async (code) => {
    if(!confirm('Delete this link?')) return
    await deleteLink(code)
    load()
  }

  if(loading) return <div>Loading…</div>
  if(error) return <div className="text-red-600">{error}</div>

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
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
                <td className="py-3 px-4">
                  <a href={`${BASE}/${l.code}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {l.code}
                  </a>
                </td>
                <td className="py-3 px-4 text-gray-700">{l.targetUrl}</td>
                <td className="py-3 px-4">{l.clicks}</td>
                <td className="py-3 px-4">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link to={`/stats/${l.code}`}  className="text-sm text-blue-200 hover:underline">Stats</Link>
                  <button onClick={()=>onDelete(l.code)} className="text-sm text-red-200 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
