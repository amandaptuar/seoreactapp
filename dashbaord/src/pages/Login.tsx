import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin")
    }
  }, [navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (username === "admin" && password === "12345") {
      localStorage.setItem("isAuthenticated", "true")
      navigate("/admin")
    } else {
      setError("Invalid username or password.")
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-6 flex items-center justify-center gap-1.5">
            <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-20 w-20 object-contain" />
            <div className="flex flex-col text-left">
              <span className="font-black text-3xl leading-tight tracking-wide text-foreground">LIMITLESS</span>
              <span className="text-[10px] font-bold tracking-widest text-[#f97316]">UNLOCK YOUR TRUE POTENTIAL</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Sign in to manage the cognitive platform.</p>
        </div>

        <Card className="border-border shadow-sm">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Enter username" 
                    className="pl-9"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Enter password" 
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Sign In</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
