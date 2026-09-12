import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, User as UserIcon, Eye, EyeOff, ShieldCheck, KeyRound, ArrowLeft, RefreshCw, Mail } from "lucide-react"
import { adminLogin, adminVerifyOtp } from "../../lib/backendApi"

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin-panel/admin")
    }
  }, [navigate])

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  // Step 1: Handle Initial Login (Username & Password)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // --- DUMMY LOGIN BYPASS FOR UI TESTING ---
    if (username === "admin" && password === "admin") {
      setTimeout(() => {
        setIsLoading(false)
        setInfoMessage("OTP sent to registered email(s). Please check your inbox. (Dev Bypass OTP: 123456)")
        setStep("otp")
        setResendCooldown(60)
      }, 500)
      return
    }
    // -----------------------------------------

    try {
      const res = await adminLogin(username, password)
      setIsLoading(false)
      setInfoMessage(res?.message || "OTP sent to registered email(s). Please check your inbox.")
      setStep("otp")
      setResendCooldown(60)
    } catch (err: any) {
      setIsLoading(false)
      setError(err?.status === 401 ? (err?.message || "Wrong credentials") : (err?.message || "Login failed."))
    }
  }

  // Step 2: Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const cleanOtp = otp.trim()
    if (!cleanOtp) {
      setError("Please enter the verification code.")
      setIsLoading(false)
      return
    }

    // --- DUMMY OTP VERIFY FOR UI TESTING ---
    if (username === "admin" && password === "admin" && cleanOtp === "123456") {
      sessionStorage.setItem("adminLoggedIn", "true")
      sessionStorage.setItem("isAuthenticated", "true")
      sessionStorage.setItem("adminToken", "dummy-token-for-ui-testing")
      sessionStorage.setItem("adminName", "Admin User")
      sessionStorage.setItem("adminRole", "Super Admin")

      setTimeout(() => {
        navigate("/admin-panel/admin")
      }, 600)
      return
    }
    // ---------------------------------------

    try {
      const res = await adminVerifyOtp(cleanOtp)
      sessionStorage.setItem("adminName", "Admin User")
      sessionStorage.setItem("adminRole", res?.role || "Super Admin")
      navigate("/admin-panel/admin")
    } catch (err: any) {
      setIsLoading(false)
      setError(
        err?.status === 401
          ? (err?.message || "Invalid or expired OTP. Please request a new one.")
          : (err?.message || "OTP verification failed.")
      )
    }
  }

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return
    setIsResending(true)
    setError("")

    if (username === "admin" && password === "admin") {
      setTimeout(() => {
        setIsResending(false)
        setResendCooldown(60)
        setInfoMessage("New OTP sent to registered email(s). (Dev Bypass OTP: 123456)")
      }, 500)
      return
    }

    try {
      const res = await adminLogin(username, password)
      setIsResending(false)
      setResendCooldown(60)
      setInfoMessage(res?.message || "A new OTP has been sent to registered email(s).")
    } catch (err: any) {
      setIsResending(false)
      setError(err?.message || "Failed to resend OTP. Please try again.")
    }
  }

  const handleBackToCredentials = () => {
    setStep("credentials")
    setOtp("")
    setError("")
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
            <span>2FA-Protected Portal</span>
          </div>
        </div>
      </div>

      {/* Right side - Form Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 relative">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[440px]">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-8">
            <img src="/img/limitless-logo.webp" alt="Limitless Logo" className="h-14 w-14 object-contain drop-shadow-sm" />
            <div className="flex flex-col justify-center text-left">
              <span className="font-black text-[32px] leading-none tracking-tight text-slate-900 uppercase">LIMITLESS</span>
              <span className="text-[10px] font-bold tracking-[0.35em] text-indigo-600 uppercase mt-1 pl-1">ADMIN PORTAL</span>
            </div>
          </div>

          {step === "credentials" ? (
            /* STEP 1: CREDENTIALS FORM */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-4 shadow-sm border border-indigo-100/50">
                  <Lock className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h2 className="text-[30px] font-extrabold text-slate-900 tracking-tight mb-2">Admin Sign In</h2>
                <p className="text-slate-500 text-[14px] font-medium px-4">
                  Enter your administrative credentials. An OTP will be sent to registered emails.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.04)] border border-slate-100">
                <form onSubmit={handleLogin} className="space-y-5">
                  {error && (
                    <div className="p-4 text-[13px] bg-red-50 text-red-600 rounded-2xl border border-red-100/60 flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
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
                          autoComplete="username"
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
                          autoComplete="current-password"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                      className="w-full flex items-center justify-center h-[52px] text-[15px] font-bold rounded-2xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Verifying Credentials...
                        </span>
                      ) : (
                        "Continue to OTP Verification"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* STEP 2: OTP VERIFICATION FORM */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 shadow-sm border border-emerald-100/60">
                  <KeyRound className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h2 className="text-[30px] font-extrabold text-slate-900 tracking-tight mb-2">Enter OTP Code</h2>
                <p className="text-slate-500 text-[14px] font-medium px-4">
                  Step 2 of 2: Multi-Factor Authentication
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.04)] border border-slate-100">
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  
                  {infoMessage && (
                    <div className="p-3.5 text-[13px] bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200/60 flex items-start gap-3">
                      <Mail className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{infoMessage}</span>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 text-[13px] bg-red-50 text-red-600 rounded-2xl border border-red-100/60 flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                      <span className="font-medium leading-relaxed">{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-slate-700 tracking-wider uppercase ml-1 flex items-center justify-between">
                      <span>One-Time Password (OTP)</span>
                      <span className="text-[11px] text-slate-400 font-normal lowercase tracking-normal">6-digit code</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="••••••" 
                        autoFocus
                        className="w-full border outline-none text-center font-mono text-2xl font-bold tracking-[0.5em] h-[58px] bg-slate-50/70 hover:bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 rounded-2xl text-slate-900 placeholder:text-slate-300 transition-all"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        required
                      />
                    </div>
                    <p className="text-[12px] text-slate-500 text-center pt-1 font-medium">
                      Check your registered admin inbox for the 6-digit code.
                    </p>
                  </div>

                  <div className="pt-1">
                    <button 
                      type="submit" 
                      disabled={isLoading || otp.trim().length === 0}
                      style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                      className="w-full flex items-center justify-center h-[52px] text-[15px] font-bold rounded-2xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Verifying Code...
                        </span>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </button>
                  </div>

                  {/* Secondary Action Buttons (Back to Login & Resend OTP) */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <button
                        type="button"
                        onClick={handleBackToCredentials}
                        className="flex items-center justify-center gap-2 h-[44px] px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer group hover:border-slate-300"
                        title="Return to username and password"
                      >
                        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform shrink-0" />
                        <span className="truncate">Back to Login</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0 || isResending}
                        className={`flex items-center justify-center gap-2 h-[44px] px-3 rounded-xl border text-[13px] font-semibold transition-all shadow-sm active:scale-[0.98] ${
                          resendCooldown > 0 || isResending
                            ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                            : "border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 hover:border-indigo-300 cursor-pointer"
                        }`}
                        title={resendCooldown > 0 ? `Wait ${resendCooldown}s before resending` : "Send a new OTP code"}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isResending ? "animate-spin" : resendCooldown > 0 ? "text-slate-400" : "text-indigo-600"}`} />
                        <span className="truncate">
                          {resendCooldown > 0
                            ? `Resend (${resendCooldown}s)`
                            : (isResending ? "Sending..." : "Resend OTP")}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
