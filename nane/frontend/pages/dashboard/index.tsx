import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-white dark:bg-[#071025] rounded shadow">
          <div className="text-sm text-gray-500">Total Balance</div>
          <div className="text-2xl font-bold">NPR 12,450</div>
        </div>
        <div className="p-4 bg-white dark:bg-[#071025] rounded shadow">
          <div className="text-sm text-gray-500">Deposited</div>
          <div className="text-2xl font-bold">NPR 20,000</div>
        </div>
        <div className="p-4 bg-white dark:bg-[#071025] rounded shadow">
          <div className="text-sm text-gray-500">Today's Earnings</div>
          <div className="text-2xl font-bold">NPR 150</div>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Available Work</h3>
          <Link href="/dashboard/work"><a className="text-sm text-blue-600">See all</a></Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="p-4 bg-white dark:bg-[#071025] rounded shadow" key={i}>
              <div className="font-semibold">Watch Ad {i + 1}</div>
              <div className="text-sm text-gray-500 mt-2">Earn NPR 10</div>
              <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-sm">Start</button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}