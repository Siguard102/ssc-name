import Link from 'next/link'
export default function Sidebar() {
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/work', label: 'Work' },
    { href: '/dashboard/tasks', label: 'Tasks' },
    { href: '/dashboard/deposit', label: 'Deposit' },
    { href: '/dashboard/withdraw', label: 'Withdraw' },
    { href: '/dashboard/profile', label: 'Profile' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' }
  ]
  return (
    <aside className="w-20 md:w-56 bg-white dark:bg-[#071025] p-3 rounded shadow">
      <nav className="flex flex-col gap-2">
        {links.map(l => (
          <Link key={l.href} href={l.href}>
            <a className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="hidden md:inline">{l.label}</span>
              <span className="md:hidden text-sm">{l.label[0]}</span>
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  )
}