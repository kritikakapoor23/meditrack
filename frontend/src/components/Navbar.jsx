import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { username, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b-2 border-blue-600 px-6 md:px-8 h-14 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b6cb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <span className="text-base font-semibold text-blue-900">MediTrack</span>
        <span className="text-xs text-gray-400 hidden md:block ml-1">Patient Management</span>
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {username && <span className="text-sm text-gray-500">{username}</span>}
            <button onClick={logout}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-medium">
              Log out
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}
            className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium">
            Log in
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar