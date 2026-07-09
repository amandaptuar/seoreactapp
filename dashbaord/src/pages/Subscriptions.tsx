import { useState, useEffect, useMemo } from "react"
import { Shield, MoreHorizontal, Power, X, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusPill } from "@/components/custom/StatusPill"
import { KPICard } from "@/components/custom/KPICard"
import { TrendChart } from "@/components/custom/TrendChart"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getUsers, updateUserStatus } from "@/services/api"

export default function Subscriptions() {
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
      console.error("Failed to fetch subscriptions data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateUserStatus(id, newStatus)
      fetchData() // Refresh list
    } catch (err) {
      console.error("Failed to update status", err)
    }
  }

  const activeSubscribers = users.filter((u) => u.payment_status === 'paid')
  const totalSubscribers = activeSubscribers.length
  
  // Hardcoded price as requested
  const planPrice = 19
  const mrr = totalSubscribers * planPrice

  // Calculate Paid Conversion Rate
  const conversionRate = users.length > 0 ? (totalSubscribers / users.length) * 100 : 0

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
    
    const data = last6Months.map(month => ({ month, revenue: 0 }))
    
    users.forEach(user => {
      if (!user.created_at || user.payment_status !== 'paid') return
      
      const date = new Date(user.created_at)
      const userMonth = months[date.getMonth()]
      const monthIndex = data.findIndex(d => d.month === userMonth)
      
      if (monthIndex !== -1) {
        data[monthIndex].revenue += 19
      }
    })
    
    return data
  }, [users])

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscriptions Management</h2>
          <p className="text-muted-foreground">Manage revenue, subscription plans, and subscriber billing.</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="subscribers">All Subscriptions ({users.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Subscribers" value={totalSubscribers.toString()} delta="+0%" deltaType="neutral" icon={Shield} />
            <KPICard title="MRR" value={`$${mrr.toLocaleString()}`} delta="+0%" deltaType="neutral" icon={Shield} />
            <KPICard title="Paid Conversion" value={`${conversionRate.toFixed(1)}%`} delta="Active" deltaType="positive" icon={RefreshCw} />
            <KPICard title="Plan Price" value={`$${planPrice}`} delta="Standard" deltaType="neutral" icon={Shield} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (MRR)</CardTitle>
              <CardDescription>Monthly recurring revenue computed from active paid users.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <TrendChart 
                type="line" 
                data={trendData} 
                xAxisKey="month" 
                dataKeys={[
                  { key: "revenue", name: "Revenue ($)", color: "hsl(var(--primary))" }
                ]} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4 m-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-lg border">
            <div>
              <h3 className="text-lg font-semibold">Subscriber List</h3>
              <p className="text-sm text-muted-foreground">View and manage all users and their subscription statuses.</p>
            </div>
            <Button variant="outline" onClick={fetchData} className="w-full sm:w-auto"><RefreshCw className="h-4 w-4 mr-2" /> Refresh</Button>
          </div>

          <div className="border rounded-lg bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No subscribers found.</TableCell>
                  </TableRow>
                ) : (
                  users.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{(sub.name || "U").substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{sub.name || "Unnamed"}</p>
                            <p className="text-xs text-muted-foreground">{sub.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(sub.created_at).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell>{sub.payment_status === 'paid' ? `$${planPrice}` : "$0"}</TableCell>
                      <TableCell><StatusPill status={sub.payment_status === 'paid' ? 'active' : 'inactive'} /></TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(sub.id, 'inactive')}><Power className="h-4 w-4 mr-2 text-warning" /> Suspend</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange(sub.id, 'expired')}><X className="h-4 w-4 mr-2" /> Cancel Subscription</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
