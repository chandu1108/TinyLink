// src/api/api.js
export const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, opts)
  if (!res.ok) {
    // try to parse error json
    let errText = `${res.status} ${res.statusText}`
    try {
      const j = await res.json().catch(()=>null)
      if (j && j.error) errText = j.error
    } catch {}
    throw new Error(errText)
  }
  // If no content (204) return null
  if (res.status === 204) return null

  // try parse json
  return res.json().catch(()=>null)
}

export async function fetchLinks() {
  return request('/api/links')
}

export async function createLink(payload) {
  return request('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export async function deleteLink(code) {
  return request(`/api/links/${encodeURIComponent(code)}`, {
    method: 'DELETE'
  })
}

export async function fetchLink(code) {
  return request(`/api/links/${encodeURIComponent(code)}`)
}
