export const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'



export async function fetchLinks(){
const res = await fetch(`${BASE}/api/links`)
if(!res.ok) throw new Error('Failed to load links')
return res.json()
}


export async function createLink(payload){
const res = await fetch(`${BASE}/api/links`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
})
if(!res.ok) {
const err = await res.json().catch(()=>({ error: 'unknown' }))
throw new Error(err.error || 'create failed')
}
return res.json()
}


export async function deleteLink(code){
const res = await fetch(`${BASE}/api/links/${code}`, { method: 'DELETE' })
if(res.status !== 204) throw new Error('delete failed')
}


export async function fetchLink(code){
const res = await fetch(`${BASE}/api/links/${code}`)
if(!res.ok) throw new Error('not found')
return res.json()
}