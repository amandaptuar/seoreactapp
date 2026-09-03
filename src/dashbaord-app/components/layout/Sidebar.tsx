import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

export const navItems = [
  { name: "Dashboard", href: "/admin-panel/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin-panel/admin/users", icon: Users },
  { name: "Subscriptions", href: "/admin-panel/admin/subscriptions", icon: CreditCard },
  { name: "Reports", href: "/admin-panel/admin/reports", icon: BarChart },
  { name: "Enquiries", href: "/admin-panel/admin/enquiries", icon: MessageSquare },
]

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  return (
    <aside className={cn(
      "w-[280px] fixed inset-y-0 left-0 bg-slate-950 border-r border-slate-900 flex flex-col z-30 transition-transform duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.15)]",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-14 w-14 object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <div className="flex flex-col">
            <span className="font-black text-2xl leading-tight tracking-wide text-white">LIMITLESS</span>
            <span className="text-[9px] font-bold tracking-widest text-[#f97316]">ADMIN PORTAL</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white" aria-label="Close menu">
           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div className="px-6 py-5 flex justify-between items-center">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Main Menu</p>
        <button onClick={() => setIsOpen(false)} className="hidden md:flex text-slate-500 hover:text-white" title="Close Sidebar" aria-label="Close sidebar">
           <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"></path></svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin-panel/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600 shadow-sm" 
                  : "hover:bg-slate-800/60"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200", 
                  isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"
                )} />
                <span className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                )}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer / User section in sidebar */}
      <div className="p-4 mt-auto mb-2">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-slate-800/50 cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Admin User</span>
            <span className="text-xs text-slate-400 font-medium">System Admin</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
