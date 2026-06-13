const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-blue-600 px-6 md:px-8 h-14 flex items-center shadow-sm">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b6cb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <span className="text-base font-semibold text-blue-900">MediTrack</span>
        <span className="text-xs text-gray-400 hidden md:block ml-1">Patient Management</span>
      </div>
    </nav>
  )
}

export default Navbar