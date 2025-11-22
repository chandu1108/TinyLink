// src/pages/Home.jsx
import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import AddLinkModal from '../components/AddLinkModal'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl flex justify-center font-semibold">Dashboard</h2>
          <p className="text-sm flex justify-center text-slate-500">Manage short links, view stats and redirects</p>
        </div>

        <div  className="flex justify-center  gap-3">
            <button
  onClick={() => {
    // try to scroll to inline form first
    const el = document.getElementById('add-short-link');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = el.querySelector('input, textarea, select');
      if (input) input.focus();
      return;
    }
    // if inline form not present, open modal (existing behavior)
    setOpen(true);
  }}
  className="inline-flex flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
>
  + Add Link
</button>

          
        </div>
      </div>

      <Dashboard key={refreshKey} onRefresh={() => setRefreshKey(k => k + 1)} />

      {open && <AddLinkModal onClose={() => setOpen(false)} onCreated={() => { setOpen(false); setRefreshKey(k => k + 1); }} />}
    </div>
  )
}
