// src/pages/Home.jsx
import React, { useState } from 'react'
import Dashboard from '../components/dashboard.jsx'
import AddLinkModal from '../components/AddLinkModal'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Link</button>
      </div>

      {/* pass refreshKey so Dashboard reloads when previewed via page reload; we can keep it simple */}
      <Dashboard key={refreshKey} />

      {open && <AddLinkModal onClose={() => setOpen(false)} onCreated={() => setRefreshKey(k => k + 1)} />}
    </div>
  )
}
