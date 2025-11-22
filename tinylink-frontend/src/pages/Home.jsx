import React, { useEffect, useState } from 'react'
// import Dashboard from '../components/Dashboard'
import Dashboard from '../components/dashboard'

import AddLinkModal from '../components/AddLinkModal'



export default function Home(){
const [open, setOpen] = useState(false)
return (
    
<div>
<div className="flex items-center justify-center mb-6">
<button id='addlink' onClick={()=>setOpen(true)} className="bg-blue-900 text-white px-4 py-2 rounded">Add Link</button>
</div>


<Dashboard />


{open && <AddLinkModal onClose={()=>setOpen(false)} />}
</div>
)
}