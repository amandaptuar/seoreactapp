import { useState, useEffect, useMemo } from "react"
import { Shield, MoreHorizontal, Power, X, RefreshCw, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
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
  const [upgradingId, setUpgradingId] = useState<string | null>(null)

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
      fetchData()
    } catch (err) {
      console.error("Failed to update status", err)
    }
  }

  const handlePlanUpgrade = async (id: string, currentStatus: string) => {
    setUpgradingId(id)
    try {
      const newStatus = currentStatus === 'paid' ? 'free' : 'paid'
      await updateUserStatus(id, newStatus)
      await fetchData()
    } catch (err) {
      console.error("Failed to update plan", err)
    } finally {
      setUpgradingId(null)
    }
  }

  const activeSubscribers = users.filter((u) => u.payment_status === 'paid')
  const totalSubscribers = activeSubscribers.length
  const planPrice = 19
  const mrr = totalSubscribers * planPrice
  const conversionRate = users.length > 0 ? (totalSubscribers / users.length) * 100 : 0

  const trendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonthIndex = new Date().getMonth()
    const last6Months: string[] = []
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
      if (monthIndex !== -1) data[monthIndex].revenue += 19
    })
    return data
  }, [users])

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
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

        {/* ===== DASHBOARD TAB ===== */}
        <TabsContent value="dashboard" className="space-y-6 m-0">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Subscribers" value={totalSubscribers.toString()} delta="+0%" deltaType="neutral" icon={Shield} />
            <KPICard title="MRR" value={`$${mrr.toLocaleString()}`} delta="+0%" deltaType="neutral" icon={Shield} />
            <KPICard title="Paid Conversion" value={`${conversionRate.toFixed(1)}%`} delta="Active" deltaType="positive" icon={RefreshCw} />
            <KPICard title="Plan Price" value={`$${planPrice}`} delta="Standard" deltaType="neutral" icon={Shield} />
          </div>

          {/* Revenue Chart */}
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

          {/* ===== USER PLAN MANAGEMENT ===== */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  User Plan Management
                </CardTitle>
                <CardDescription className="mt-1">
                  View and manage each user&apos;s subscription plan. Upgrade or downgrade their plan — changes update instantly in the database.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fetchData} className="shrink-0">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </CardHeader>

            {/* Summary badges */}
            <div className="px-6 pb-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {totalSubscribers} Paid users
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                {users.length - totalSubscribers} Free users
              </div>
            </div>

            <CardContent className="p-0">
              {users.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No users found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Current Plan</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead className="text-right">Manage Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => {
                        const isPaid = user.payment_status === 'paid'
                        const isUpgrading = upgradingId === user.id
                        return (
                          <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback
                                    className={
                                      isPaid
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "bg-muted text-muted-foreground font-semibold"
                                    }
                                  >
                                    {(user.name || "U").substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-sm">{user.name || "Unnamed"}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                  isPaid
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                                    : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                }`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${isPaid ? "bg-emerald-500" : "bg-slate-400"}`} />
                                {isPaid ? "Paid" : "Free"}
                              </span>
                            </TableCell>

                            <TableCell>
                              <StatusPill status={isPaid ? 'active' : 'inactive'} />
                            </TableCell>

                            <TableCell className="text-right">
                              {isPaid ? (
                                <Button
                                  size="sm"
                                  disabled={isUpgrading}
                                  variant="outline"
                                  className="text-xs gap-1.5 text-slate-600 hover:text-slate-900 border-slate-300"
                                  onClick={() => handlePlanUpgrade(user.id, user.payment_status)}
                                >
                                  {isUpgrading ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <ArrowDownCircle className="h-3.5 w-3.5" />
                                  )}
                                  Downgrade to Free
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  disabled={isUpgrading}
                                  className="text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
                                  onClick={() => handlePlanUpgrade(user.id, user.payment_status)}
                                >
                                  {isUpgrading ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <ArrowUpCircle className="h-3.5 w-3.5" />
                                  )}
                                  Upgrade to Paid
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== ALL SUBSCRIPTIONS TAB ===== */}
        <TabsContent value="subscribers" className="space-y-4 m-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-lg border">
            <div>
              <h3 className="text-lg font-semibold">Subscriber List</h3>
              <p className="text-sm text-muted-foreground">View and manage all users and their subscription statuses.</p>
            </div>
            <Button variant="outline" onClick={fetchData} className="w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>

          <div className="border rounded-lg bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No subscribers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((sub) => {
                    const isPaid = sub.payment_status === 'paid'
                    return (
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
                        <TableCell>{isPaid ? `$${planPrice}` : "$0"}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                              isPaid
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                            }`}
                          >
                            {isPaid ? "Paid" : "Free"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusPill status={isPaid ? 'active' : 'inactive'} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!isPaid ? (
                                <DropdownMenuItem onClick={() => handleStatusChange(sub.id, 'paid')}>
                                  <ArrowUpCircle className="h-4 w-4 mr-2 text-emerald-500" /> Upgrade to Paid
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleStatusChange(sub.id, 'free')}>
                                  <ArrowDownCircle className="h-4 w-4 mr-2 text-slate-500" /> Downgrade to Free
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuItem onClick={() => handleStatusChange(sub.id, 'inactive')}>
                                <Power className="h-4 w-4 mr-2 text-yellow-500" /> Suspend
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleStatusChange(sub.id, 'expired')}
                              >
                                <X className="h-4 w-4 mr-2" /> Cancel Subscription
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
