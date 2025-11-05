import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import axios from 'axios'

type User = {
  id: number
  name?: string
  mobile: string
  email?: string
  isActive: boolean
  role?: string
  wallet?: { balance: number }
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchUsers = async (p = page) => {
    setLoading(true)
    try {
      const q = new URLSearchParams()
      q.set('page', String(p))
      q.set('limit', String(limit))
      if (search) q.set('search', search)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'}/api/admin/users?${q.toString()}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      })
      setUsers(res.data.users)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch users. Ensure you are authenticated as admin.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doSearch = async () => {
    await fetchUsers(1)
  }

  const prev = () => {
    if (page > 1) fetchUsers(page - 1)
  }
  const next = () => {
    if (page * limit < total) fetchUsers(page + 1)
  }

  return (
    <Layout>
      <div>
        <h2 className="text-xl font-semibold mb-3">Admin Panel</h2>

        <div className="bg-white dark:bg-[#071025] p-3 rounded shadow mb-4">
          <div className="flex gap-2 mb-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-2 rounded flex-1"
              placeholder="Search name, mobile or email"
            />
            <button onClick={doSearch} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
            <Link href="/"><a className="px-4 py-2 border rounded">Back</a></Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Mobile</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Active</th>
                  <th className="p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-3">Loading...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={7} className="p-3">No users found</td></tr>
                ) : users.map(u => (
                  <tr key={u.id} className="border-b">
                    <td className="p-2">{u.id}</td>
                    <td className="p-2">{u.name || '-'}</td>
                    <td className="p-2">{u.mobile}</td>
                    <td className="p-2">{u.email || '-'}</td>
                    <td className="p-2">{u.role || 'user'}</td>
                    <td className="p-2">{u.isActive ? 'Yes' : 'No'}</td>
                    <td className="p-2">NPR {u.wallet?.balance ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div>Showing page {page} — total {total}</div>
            <div className="flex gap-2">
              <button onClick={prev} disabled={page <= 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
              <button onClick={next} disabled={page * limit >= total} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}