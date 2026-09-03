import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  delta?: string
  deltaType?: "positive" | "negative" | "neutral"
  icon: React.ElementType
}

export function KPICard({ title, value, delta, deltaType, icon: Icon }: KPICardProps) {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-6 flex flex-col justify-center relative">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{title}</p>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex items-center justify-center shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        
        <div className="flex items-end justify-between relative z-10">
          <h3 className="text-3xl font-black tracking-tight text-slate-900 group-hover:text-indigo-950 transition-colors">{value}</h3>
          {delta && (
            <span 
              className={cn(
                "text-[11px] font-bold px-2 py-1 rounded-md shadow-sm border",
                deltaType === "positive" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                deltaType === "negative" && "bg-red-50 text-red-600 border-red-100",
                deltaType === "neutral" && "bg-slate-50 text-slate-500 border-slate-200"
              )}
            >
              {delta}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
