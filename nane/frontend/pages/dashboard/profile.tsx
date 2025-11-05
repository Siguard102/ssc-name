import Layout from '../../components/Layout'
import { useState } from 'react'
export default function Profile() {
  const [name, setName] = useState('Siguard102')
  const [email, setEmail] = useState('')
  const [bank, setBank] = useState('')

  const save = () => {
    // call API to save profile
    alert('Profile saved (demo)')
  }

  return (
    <Layout>
      <div className="max-w-2xl bg-white dark:bg-[#071025] p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Profile & Portfolio</h3>
        <div className="grid gap-3">
          <div>
            <label className="text-sm block">Name</label>
            <input className="w-full border p-2 rounded mt-1" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block">Email</label>
            <input className="w-full border p-2 rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block">Bank / eSewa</label>
            <input className="w-full border p-2 rounded mt-1" value={bank} onChange={e => setBank(e.target.value)} />
          </div>
          <div>
            <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}