import { cn } from "@/lib/utils"

interface RiskMeterProps {
  percentage: number
  className?: string
}

export function RiskMeter({ percentage, className }: RiskMeterProps) {
  // Determine color based on percentage (higher percentage = higher risk)
  let colorClass = "bg-success"
  if (percentage >= 25 && percentage < 50) colorClass = "bg-primary"
  if (percentage >= 50 && percentage < 75) colorClass = "bg-warning"
  if (percentage >= 75) colorClass = "bg-destructive"

  return (
    <div className={cn("w-full flex items-center gap-3", className)}>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
    </div>
  )
}
