import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TrendChartProps {
  data: any[]
  type: "line" | "bar"
  dataKeys: { key: string; color: string; name: string }[]
  xAxisKey: string
  className?: string
}

export function TrendChart({ data, type, dataKeys, xAxisKey, className }: TrendChartProps) {
  const ChartComponent = type === "line" ? LineChart : BarChart

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: "8px", 
              border: "1px solid hsl(var(--border))", 
              backgroundColor: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))"
            }} 
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          {dataKeys.map((dk) => (
            type === "line" ? (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                name={dk.name}
                stroke={dk.color}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            ) : (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                name={dk.name}
                fill={dk.color}
                radius={[4, 4, 0, 0] as any}
              />
            )
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}
