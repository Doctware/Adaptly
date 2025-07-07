import React from "react";
import { logo } from "../assets";
import { useSession } from "../hooks/useSession";

export function Navbar() {
  const { user } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Adaptly Logo" className="h-8 w-auto" />
        <span className="font-bold text-lg text-blue-600">Adaptly</span>
      </div>
      <div className="flex gap-4 items-center">
        <a href="/" className="hover:text-blue-600">Dashboard</a>
        <a href="/deploy" className="hover:text-blue-600">Deploy</a>
        <a href="/feature-flags" className="hover:text-blue-600">Feature Flags</a>
        <a href="/logs" className="hover:text-blue-600">Logs</a>
        {user ? (
          <div className="flex items-center gap-2 ml-4">
            <img src={user.avatar_url} alt="avatar" className="h-7 w-7 rounded-full border" />
            <span className="text-sm font-medium">{user.name || user.login}</span>
            <a href="/auth/logout" className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs">Logout</a>
          </div>
        ) : (
          <a href="/login" className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Login</a>
        )}
      </div>
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="w-48 bg-gray-50 h-full p-4 border-r border-gray-200 hidden md:block">
      <ul className="space-y-4">
        <li><a href="/" className="block hover:text-blue-600">Dashboard</a></li>
        <li><a href="/deploy" className="block hover:text-blue-600">Deploy</a></li>
        <li><a href="/feature-flags" className="block hover:text-blue-600">Feature Flags</a></li>
        <li><a href="/logs" className="block hover:text-blue-600">Logs</a></li>
      </ul>
    </aside>
  );
}
