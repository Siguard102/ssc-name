import React from 'react'
export default function Header() {
  // static header for demo; in production hook into auth
  return (
    <div className="flex justify-between items-center bg-white dark:bg-[#071025] p-3 rounded shadow">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Welcome back</div>
        <div className="font-semibold">Siguard102</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Today's Earnings</div>
          <div className="font-semibold">NPR 150</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  )
}