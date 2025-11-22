import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import StatsView from './pages/StatsView'
import './index.css'

export default function App(){
  return (
    <div style={{backgroundColor:'lightblue'}} className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 id='tinylink' className="text-2xl items-center font-bold tracking-tight content-center">TinyLink</h1>
          <nav>
            <Link to="/" className="text-blue-600 hover:underline font-medium">Dashboard</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats/:code" element={<StatsView />} />
        </Routes>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500">
        TinyLink — demo project
      </footer>
    </div>
  )
}
