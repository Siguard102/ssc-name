import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">SMCNepal</h2>
      <p className="text-gray-600 mb-6">Earn by completing simple tasks and watching ads.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/login">
          <a className="px-6 py-2 bg-blue-600 text-white rounded">Login / Signup</a>
        </Link>
        <Link href="/dashboard">
          <a className="px-6 py-2 border rounded">Go to Dashboard</a>
        </Link>
      </div>
    </div>
  )
}