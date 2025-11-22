// tinylink-frontend/src/pages/Home.jsx
import React, { useState } from 'react'
import Dashboard from '../components/Dashboard.jsx'
import AddLinkModal from '../components/AddLinkModal.jsx'

export default function Home(){
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button onClick={()=>setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Add Link</button>
      </div>

      <Dashboard />

      {open && <AddLinkModal onClose={()=>setOpen(false)} />}
    </div>
  )
}
