import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Overview', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  )},
  { to: '/patients', label: 'All patients', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { to: '/add', label: 'Add patient', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
  )},
]

const Sidebar = () => {
  return (
    <aside className="w-48 min-h-screen bg-white border-r border-gray-200 p-4 hidden md:flex flex-col gap-1">
      <p className="text-xs text-gray-400 uppercase tracking-widest px-2 mb-2 font-medium">Main</p>
      {links.map(({ to, label, icon }) => (
        <NavLink key={to} to={to} end={to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium border border-blue-100'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`
          }>
          {icon}
          {label}
        </NavLink>
      ))}
    </aside>
  )
}

export default Sidebar