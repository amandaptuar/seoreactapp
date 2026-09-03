import { useState } from "react"
import { Menu, LogOut } from "lucide-react"
import { useNavigate, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { navItems } from "./Sidebar"
import { cn } from "@/lib/utils"

export function Topbar({ setIsSidebarOpen }: { setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated")
    navigate("/admin-panel/login")
  }

  return (
    <header 
      className="bg-slate-950 border-b border-slate-900 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm"
      style={{ height: '84px' }}
    >
      <div className="flex items-center h-full -mt-3">
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          style={{ color: '#ffffff' }}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex items-center h-full -mt-3">
        <button 
          onClick={handleLogout} 
          className="flex justify-center items-center gap-2 text-[14px] font-bold rounded-md transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          style={{ 
            width: '180px',
            height: '36px',
            backgroundColor: '#dc2626', 
            color: '#ffffff', 
            border: '1px solid #ef4444',
            boxShadow: '0 4px 10px 0 rgba(220,38,38,0.25)' 
          }}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </header>
  )
}
