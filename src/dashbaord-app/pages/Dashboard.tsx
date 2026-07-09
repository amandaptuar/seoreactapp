import { useState, useEffect, useMemo } from "react"
import { Users, UserCheck, UserPlus, DollarSign, Activity, RefreshCw, PlayCircle } from "lucide-react"
import { KPICard } from "@/components/custom/KPICard"
import { TrendChart } from "@/components/custom/TrendChart"
import { DonutChart } from "@/components/custom/DonutChart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatusPill } from "@/components/custom/StatusPill"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getUsers } from "@/services/api"

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  // --- KPI Calculations ---
  const totalUsers = users.length
  
  const activeUsers = users.filter((u) => u.payment_status === 'paid').length
  const freeUsers = totalUsers - activeUsers

  
  // Calculate Revenue (Plan is $19 for each active user)
  const MRR = activeUsers * 19
  const ARR = MRR * 12

  // Calculate New Registrations (Last 24 Hours)
  const twentyFourHoursAgo = new Date()
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)
  const newRegistrations = users.filter((u) => new Date(u.created_at) >= twentyFourHoursAgo).length

  // Calculate Conversion Rate & Assessments
  const conversionRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0
  const completedAssessments = users.filter((u) => u.report_json).length



  // --- Chart Data Computations ---
  const riskData = useMemo(() => {
    const counts: Record<string, number> = {
      Excellent: 0,
      Good: 0,
      Moderate: 0,
      "At Risk": 0,
      Unknown: 0
    }

    users.forEach(u => {
      const rating = u.report_json?.overall?.rating || "Unknown"
      if (counts[rating] !== undefined) {
        counts[rating]++
      } else {
        counts["Unknown"]++
      }
    })

    return [
      { level: "Excellent", count: counts["Excellent"], color: "bg-success" },
      { level: "Good", count: counts["Good"], color: "bg-primary" },
      { level: "Moderate", count: counts["Moderate"], color: "bg-warning" },
      { level: "At Risk", count: counts["At Risk"], color: "bg-destructive" },
      { level: "Unknown", count: counts["Unknown"], color: "bg-muted" },
    ].filter(item => item.count > 0)
  }, [users])

  // Calculate real historical trend data (Last 6 Months)
  const trendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonthIndex = new Date().getMonth()
    
    const last6Months = []
    for (let i = 5; i >= 0; i--) {
      let m = currentMonthIndex - i
      if (m < 0) m += 12
      last6Months.push(months[m])
    }
    
    const data = last6Months.map(month => ({ month, users: 0, revenue: 0 }))
    
    users.forEach(user => {
      if (!user.created_at) return
      const date = new Date(user.created_at)
      
      // Only count if it's within the current year/recent 6 months
      // For simplicity in a basic dashboard, we match by month name string
      const userMonth = months[date.getMonth()]
      const monthIndex = data.findIndex(d => d.month === userMonth)
      
      if (monthIndex !== -1) {
        data[monthIndex].users += 1
        if (user.payment_status === 'paid') {
          data[monthIndex].revenue += 19
        }
      }
    })
    
    return data
  }, [users])

  // Calculate daily registrations (Last 10 Days)
  const dailyRegistrationsData = useMemo(() => {
    const data: { dateStr: string; users: number }[] = []
    const today = new Date()
    
    for (let i = 9; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = `${d.getMonth() + 1}/${d.getDate()}`
      data.push({ dateStr, users: 0 })
    }
    
    users.forEach(user => {
      if (!user.created_at) return
      const d = new Date(user.created_at)
      const dateStr = `${d.getMonth() + 1}/${d.getDate()}`
      
      const dayIndex = data.findIndex(item => item.dateStr === dateStr)
      if (dayIndex !== -1) {
        data[dayIndex].users += 1
      }
    })
    
    return data
  }, [users])

  const planData = [
    { name: "Paid ($19)", value: activeUsers, color: "hsl(var(--success))" },
    { name: "Free Users", value: freeUsers, color: "hsl(var(--warning))" }
  ].filter(p => p.value > 0)

  const recentUsers = users.slice(0, 5)

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor key metrics, user growth, and subscription health.</p>
        </div>
        <Button variant="outline" onClick={fetchData}><RefreshCw className="h-4 w-4 mr-2" /> Refresh Data</Button>
      </div>

      {/* KPI Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Users" value={totalUsers.toLocaleString()} delta="+0%" deltaType="neutral" icon={Users} />
        <KPICard title="Active Users" value={activeUsers.toLocaleString()} delta="+0%" deltaType="neutral" icon={UserCheck} />
        <KPICard title="New Registrations" value={newRegistrations.toLocaleString()} delta="+0%" deltaType="neutral" icon={UserPlus} />
        <KPICard title="Free Users" value={freeUsers.toLocaleString()} delta="+0%" deltaType="neutral" icon={UserCheck} />
      </div>

      {/* KPI Cards Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Monthly Revenue (MRR)" value={`$${MRR.toLocaleString()}`} delta="+0%" deltaType="neutral" icon={DollarSign} />
        <KPICard title="Annual Revenue (ARR)" value={`$${ARR.toLocaleString()}`} delta="+0%" deltaType="neutral" icon={Activity} />
        <KPICard title="Paid Conversion" value={`${conversionRate.toFixed(1)}%`} delta="+0%" deltaType="neutral" icon={RefreshCw} />
        <KPICard title="Assessments Taken" value={completedAssessments.toLocaleString()} delta="+0%" deltaType="neutral" icon={UserCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Growth & Revenue</CardTitle>
            <CardDescription>New registrations and generated revenue over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <TrendChart 
              type="line" 
              data={trendData} 
              xAxisKey="month" 
              dataKeys={[
                { key: "revenue", name: "Revenue ($)", color: "hsl(var(--success))" },
                { key: "users", name: "Users", color: "hsl(var(--primary))" }
              ]} 
            />
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Active subscriptions by status.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            {planData.length > 0 ? (
              <DonutChart data={planData} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Registrations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Registrations</CardTitle>
            <CardDescription>New user signups over the last 10 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <TrendChart 
              type="bar" 
              data={dailyRegistrationsData} 
              xAxisKey="dateStr" 
              dataKeys={[
                { key: "users", name: "New Users", color: "hsl(var(--primary))" }
              ]} 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registrations on the platform.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {recentUsers.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">No users found in the database.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{user.name || "Unnamed"}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell><StatusPill status={user.payment_status === 'paid' ? 'active' : (user.payment_status || 'inactive')} /></TableCell>
                        <TableCell>
                          {user.report_json?.overall?.score ? (
                            <span className="font-bold">{user.report_json.overall.score}</span>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Cognitive Risk Distribution</CardTitle>
            <CardDescription>Overview of user cognitive risk levels.</CardDescription>
          </CardHeader>
          <CardContent>
            {riskData.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">No risk data available yet.</div>
            ) : (
              <div className="space-y-6 pt-4">
                {riskData.map((item) => (
                  <div key={item.level} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.level}</span>
                      <span className="text-muted-foreground">{item.count} users</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${(item.count / Math.max(1, totalUsers)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
