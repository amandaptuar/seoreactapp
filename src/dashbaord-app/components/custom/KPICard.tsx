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
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {delta && (
              <span 
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  deltaType === "positive" && "bg-success/15 text-success",
                  deltaType === "negative" && "bg-destructive/15 text-destructive",
                  deltaType === "neutral" && "bg-muted text-muted-foreground"
                )}
              >
                {delta}
              </span>
            )}
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  )
}
