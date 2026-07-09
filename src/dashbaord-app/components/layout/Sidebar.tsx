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

export function Sidebar() {
  return (
    <aside className="w-[280px] fixed inset-y-0 left-0 bg-card border-r flex flex-col z-10 transition-all duration-300 hidden md:flex">
      <div className="h-28 flex items-center px-6 border-b gap-1.5">
        <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-20 w-20 object-contain" />
        <div className="flex flex-col">
          <span className="font-black text-3xl leading-tight tracking-wide text-foreground">LIMITLESS</span>
          <span className="text-[10px] font-bold tracking-widest text-[#f97316]">UNLOCK YOUR TRUE POTENTIAL</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin-panel/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
