import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  className?: string
}

export function DonutChart({ data, className }: DonutChartProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: "8px", 
              border: "1px solid hsl(var(--border))", 
              backgroundColor: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))"
            }} 
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
