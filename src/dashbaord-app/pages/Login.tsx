import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, User as UserIcon, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { adminLogin } from "../../lib/backendApi"

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin-panel/admin")
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // --- DUMMY LOGIN BYPASS FOR UI TESTING ---
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('adminToken', 'dummy-token-for-ui-testing');
      sessionStorage.setItem('adminName', 'Admin User');
      sessionStorage.setItem('adminRole', 'Super Admin');
      
      setTimeout(() => {
        navigate("/admin-panel/admin");
      }, 800);
      return;
    }
    // -----------------------------------------

    try {
      await adminLogin(username, password)
      sessionStorage.setItem('adminName', 'Admin User');
      sessionStorage.setItem('adminRole', 'Super Admin');
      navigate("/admin-panel/admin")
    } catch (err: any) {
      setError(err?.status === 401 ? "Invalid username or password." : (err?.message || "Login failed."))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Left side - Branding/Hero (hidden on mobile) */}
      <div 
        className="hidden lg:flex flex-col justify-between w-1/2 text-white p-12 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/join-us/herobg.png')" }}
      >
        <div className="absolute inset-0 z-0 bg-slate-950/80 pointer-events-none" />
        
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/40 blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/40 blur-[120px] z-0 pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-4">
          <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-16 w-16 object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <div className="flex flex-col justify-center">
            <span className="font-black text-[40px] leading-none tracking-tight text-white uppercase">LIMITLESS</span>
            <span className="text-[11px] font-bold tracking-[0.4em] text-[#f97316] uppercase mt-1 pl-1">ADMIN PORTAL</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            System Online & Verified
          </div>
          <h1 className="text-4xl sm:text-[42px] font-extrabold leading-[1.15] mb-6 tracking-tight text-white drop-shadow-sm">
            Unleash True Potential With Limitless
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Experience the next generation of platform management. Gain unparalleled control over cognitive analytics, assessment histories, user workflows, and system reliability.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Limitless World. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Admin Portal</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 relative">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[420px]">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-8">
            <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-14 w-14 object-contain drop-shadow-sm" />
            <div className="flex flex-col justify-center text-left">
              <span className="font-black text-[32px] leading-none tracking-tight text-slate-900 uppercase">LIMITLESS</span>
              <span className="text-[10px] font-bold tracking-[0.35em] text-indigo-600 uppercase mt-1 pl-1">ADMIN PORTAL</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-4 shadow-sm border border-indigo-100/50">
              <Lock className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-[14px] font-medium px-4">Please enter your administrative credentials to continue.</p>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.04)] border border-slate-100">
            <form onSubmit={handleLogin} className="space-y-5">
              
              {error && (
                <div className="p-4 text-[13px] bg-red-50 text-red-600 rounded-2xl border border-red-100/60 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  <span className="font-medium leading-relaxed">{error}</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-700 tracking-wider uppercase ml-1">
                    Username / Email
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-[18px] top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Enter admin username" 
                      className="w-full border outline-none pl-[50px] pr-4 h-[52px] bg-slate-50/50 hover:bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 rounded-2xl text-slate-900 placeholder:text-slate-400 transition-all font-medium text-[14px]"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-700 tracking-wider uppercase ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-[18px] top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      className={`w-full border outline-none pl-[50px] pr-12 h-[52px] bg-slate-50/50 hover:bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 rounded-2xl text-slate-900 placeholder:text-slate-400 transition-all font-medium text-[14px] ${!showPassword && password ? 'tracking-[0.2em]' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                  className="w-full flex items-center justify-center h-[52px] text-[15px] font-bold rounded-2xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In to Dashboard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
