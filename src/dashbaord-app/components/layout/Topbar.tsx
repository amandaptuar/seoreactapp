import { Menu, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Topbar({ setIsSidebarOpen }: { setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated")
    sessionStorage.removeItem("adminToken")
    sessionStorage.removeItem("adminLoggedIn")
    sessionStorage.removeItem("adminName")
    sessionStorage.removeItem("adminRole")
    navigate("/admin-panel/login")
  }

  return (
    <header 
      className="bg-slate-950 border-b border-slate-900 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-md"
      style={{ height: '80px', backgroundColor: '#020617', color: '#ffffff' }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Visible Burger Menu Button */}
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="p-2.5 rounded-xl text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer shadow-md"
          style={{
            backgroundColor: '#0f172a',
            border: '1.5px solid #475569',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            color: '#ffffff'
          }}
          aria-label="Toggle Sidebar"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5 text-white" style={{ stroke: '#ffffff', color: '#ffffff', strokeWidth: '2.5' }} />
        </button>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">


        {/* Log Out Button */}
        <button 
          onClick={handleLogout} 
          className="flex justify-center items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] font-bold rounded-xl transition-all hover:-translate-y-0.5 active:scale-[0.98] px-3 sm:px-4 py-2"
          style={{ 
            backgroundColor: '#dc2626', 
            color: '#ffffff', 
            border: '1px solid #ef4444',
            boxShadow: '0 4px 12px 0 rgba(220,38,38,0.35)' 
          }}
        >
          <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ stroke: '#ffffff' }} />
          <span>Log Out</span>
        </button>
      </div>
    </header>
  )
}
