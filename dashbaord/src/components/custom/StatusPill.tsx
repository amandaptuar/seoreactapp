import { cn } from "@/lib/utils"

export type Status = "active" | "trial" | "demo" | "expired" | "inactive" | "at_risk" | "moderate" | "good" | "excellent"

interface StatusPillProps {
  status: Status
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const formatStatus = (s: string) => s.replace("_", " ").toUpperCase()

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border",
        status === "active" && "bg-success/10 text-success border-success/20",
        status === "trial" && "bg-warning/10 text-warning border-warning/20",
        status === "demo" && "bg-warning/10 text-warning border-warning/20",
        status === "expired" && "bg-destructive/10 text-destructive border-destructive/20",
        status === "inactive" && "bg-muted text-muted-foreground border-border",
        status === "excellent" && "bg-success/10 text-success border-success/20",
        status === "good" && "bg-primary/10 text-primary border-primary/20",
        status === "moderate" && "bg-warning/10 text-warning border-warning/20",
        status === "at_risk" && "bg-destructive/10 text-destructive border-destructive/20",
        className
      )}
    >
      {formatStatus(status)}
    </span>
  )
}
