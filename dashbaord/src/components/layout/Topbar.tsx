import { useState } from "react"
import { Menu, LogOut } from "lucide-react"
import { useNavigate, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { navItems } from "./Sidebar"
import { cn } from "@/lib/utils"

export function Topbar() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
            <SheetHeader className="h-28 flex items-center px-6 border-b gap-4 text-left">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex items-center gap-1.5 w-full">
                <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-20 w-20 object-contain" />
                <div className="flex flex-col">
                  <span className="font-black text-3xl leading-tight tracking-wide text-foreground">LIMITLESS</span>
                  <span className="text-[10px] font-bold tracking-widest text-[#f97316]">UNLOCK YOUR TRUE POTENTIAL</span>
                </div>
              </div>
            </SheetHeader>
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/admin"}
                  onClick={() => setOpen(false)}
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
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </header>
  )
}
