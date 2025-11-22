// src/App.jsx
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import StatsView from './pages/StatsView'

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 ">
          <div className="flex justify-center items-center gap-4">
            
            <div>
              <h1 className="text-lg font-semibold">TinyLink</h1>
              <p className="text-xs flex justify-center text-slate-500">Simple, fast URL shortener</p>
            </div>
          </div> 

          <nav className="flex justify-center gap-5">
            <Link to="/" className="text-sm text-slate-700 hover:text-slate-900">Dashboard</Link> 
          </nav>
          <a href="https://github.com/chandu1108/TinyLink" target="_blank" rel="noreferrer" className="text-sm text-slate-500 flex justify-center hover:text-slate-700">Repo</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats/:code" element={<StatsView />} />
        </Routes>
      </main>

      <footer className="text-center p-6 text-sm text-slate-500">
        TinyLink — built with ❤️ by Chandan Kumar. Backend: <a className="text-blue-600" href="https://tinylink-q25x.onrender.com" target="_blank" rel="noreferrer">tinylink-q25x.onrender.com</a>
      </footer>
    </div>
  )
}
