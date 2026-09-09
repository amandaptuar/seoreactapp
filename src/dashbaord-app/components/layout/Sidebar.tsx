import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart,
  MessageSquare,
  ClipboardList,
  X,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"

export const navItems = [
  { name: "Dashboard", href: "/admin-panel/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin-panel/admin/users", icon: Users },
  { name: "Assessments", href: "/admin-panel/admin/assessments", icon: ClipboardList },
  { name: "Subscriptions", href: "/admin-panel/admin/subscriptions", icon: CreditCard },
  { name: "Reports", href: "/admin-panel/admin/reports", icon: BarChart },
  { name: "Enquiries", href: "/admin-panel/admin/enquiries", icon: MessageSquare },
]

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const adminName = sessionStorage.getItem("adminName") || "Admin User"
  const adminRole = sessionStorage.getItem("adminRole") || "Super Admin"

  return (
    <aside 
      className={cn(
        "w-[280px] fixed inset-y-0 left-0 bg-slate-950 border-r border-slate-900 flex flex-col z-30 transition-transform duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.5)] text-white",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ backgroundColor: '#020617', color: '#ffffff' }}
    >
      {/* Brand Header */}
      <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-12 w-12 object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <div className="flex flex-col">
            <span className="font-black text-2xl leading-tight tracking-wide text-white" style={{ color: '#ffffff' }}>LIMITLESS</span>
            <span className="text-[9px] font-bold tracking-widest text-[#f97316]" style={{ color: '#f97316' }}>ADMIN PORTAL</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="md:hidden p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white" 
          style={{ color: '#ffffff' }}
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white" style={{ color: '#ffffff', stroke: '#ffffff' }} />
        </button>
      </div>

      {/* Navigation section label */}
      <div className="px-6 py-4 flex justify-between items-center">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider" style={{ color: '#94a3b8' }}>
          Navigation Menu
        </p>
        <button 
          onClick={() => setIsOpen(false)} 
          className="hidden md:flex p-1.5 rounded-md hover:bg-slate-900 text-slate-400 hover:text-white transition-colors" 
          title="Collapse Sidebar" 
          aria-label="Close sidebar"
          style={{ color: '#94a3b8' }}
        >
          <ChevronLeft className="w-4 h-4" style={{ stroke: '#94a3b8' }} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin-panel/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group no-underline",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                  : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
              )
            }
            style={({ isActive }) => ({
              color: isActive ? '#ffffff' : '#e2e8f0',
              backgroundColor: isActive ? '#4f46e5' : 'transparent',
              textDecoration: 'none'
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={cn(
                    "h-5 w-5 transition-transform duration-200 shrink-0", 
                    isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"
                  )} 
                  style={{
                    color: isActive ? '#ffffff' : '#94a3b8',
                    stroke: isActive ? '#ffffff' : '#94a3b8'
                  }}
                />
                <span 
                  className="truncate text-[14px] font-semibold"
                  style={{ color: isActive ? '#ffffff' : '#f1f5f9' }}
                >
                  {item.name}
                </span>
                {item.name === "Assessments" && (
                  <span 
                    className="ml-auto text-[10px] font-bold bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full"
                    style={{ color: '#c7d2fe', backgroundColor: 'rgba(99, 102, 241, 0.25)' }}
                  >
                    Live
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer / User section in sidebar */}
      <div className="p-4 mt-auto border-t border-slate-900 bg-slate-950/90">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white truncate" style={{ color: '#ffffff' }} title="Admin">
              Admin
            </span>
            <span className="text-[11px] text-amber-400 font-bold tracking-wide flex items-center gap-1" style={{ color: '#fbbf24' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" style={{ backgroundColor: '#34d399' }} />
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
