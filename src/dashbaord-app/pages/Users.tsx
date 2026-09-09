import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Download, MoreHorizontal, Eye, Trash2, Calendar, ArrowRight, ClipboardList, FileSpreadsheet, FileJson, RefreshCw, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusPill } from "@/components/custom/StatusPill"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getUsers, deleteUser, updateUserStatus, exportUsersToCSV, exportDatabaseBackup } from "@/services/api"

export default function Users() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch (error) {
      console.error("Failed to fetch users", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
      setSelectedUsers(prev => prev.filter(uid => uid !== id))
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) return
    try {
      await Promise.all(selectedUsers.map(id => deleteUser(id)))
      setUsers(users.filter(u => !selectedUsers.includes(u.id)))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to delete users", error)
      fetchData()
    }
  }

  const handleBulkSuspend = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to suspend ${selectedUsers.length} selected users?`)) return
    try {
      await Promise.all(selectedUsers.map(id => updateUserStatus(id, 'suspended')))
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'suspended' } : u))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to suspend users", error)
      fetchData()
    }
  }

  const handleBulkUnsuspend = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to unsuspend ${selectedUsers.length} selected users?`)) return
    try {
      await Promise.all(selectedUsers.map(id => updateUserStatus(id, 'paid')))
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'paid' } : u))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to unsuspend users", error)
      fetchData()
    }
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
  }

  const toggleUserSelection = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(prev => prev.filter(uid => uid !== id))
    } else {
      setSelectedUsers(prev => [...prev, id])
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = 
        (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      
      let matchesStatus = true;
      if (statusFilter === 'paid') {
        matchesStatus = user.payment_status === 'paid';
      } else if (statusFilter === 'free') {
        matchesStatus = user.payment_status !== 'paid' && user.payment_status !== 'suspended';
      } else if (statusFilter === 'suspended') {
        matchesStatus = user.payment_status === 'suspended';
      }

      let matchesRisk = true;
      const userRisk = (user.report_json?.overall?.rating || user.risk_level || "").toLowerCase();
      if (riskFilter !== 'all') {
        matchesRisk = userRisk.includes(riskFilter.toLowerCase());
      }
      
      const userDate = user.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "";
      const matchesStartDate = !startDate || userDate >= startDate;
      const matchesEndDate = !endDate || userDate <= endDate;
      
      return matchesSearch && matchesStatus && matchesRisk && matchesStartDate && matchesEndDate
    })
  }, [users, searchTerm, statusFilter, riskFilter, startDate, endDate])

  const handleExportFilteredCSV = () => {
    const dataToExport = selectedUsers.length > 0 
      ? users.filter(u => selectedUsers.includes(u.id))
      : filteredUsers;
    const blob = exportUsersToCSV(dataToExport)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `limitless_users_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">User Directory & Management</h2>
          <p className="text-slate-500 font-medium">Search, filter, inspect assessment histories, and manage registered participants.</p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportFilteredCSV}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: '1px solid #22c55e',
              boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
            }}
          >
            <FileSpreadsheet className="h-4 w-4 text-white" />
            <span>Export CSV ({selectedUsers.length > 0 ? selectedUsers.length : filteredUsers.length})</span>
          </button>
          <button
            onClick={fetchData}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              border: '1px solid #34d399',
              boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
            }}
          >
            <RefreshCw className={`h-4 w-4 text-white ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search name, email..." 
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">
          {/* Date range */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl shadow-sm h-10 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
            <div className="flex items-center px-3 bg-slate-100 border-r border-slate-200 text-slate-500 h-full">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-xs font-semibold">Date</span>
            </div>
            <Input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-[125px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-2 text-xs font-medium text-slate-700"
              title="Start Date"
            />
            <div className="px-2 text-emerald-600 h-full flex items-center bg-slate-100 border-x border-slate-200">
              <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <Input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-[125px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-2 text-xs font-medium text-slate-700"
              title="End Date"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-10 bg-slate-50 border-slate-200 focus:ring-emerald-600/20 rounded-xl font-medium text-slate-700 text-xs">
              <SelectValue placeholder="Plan Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="paid">Paid ($19)</SelectItem>
              <SelectItem value="free">Free Preview</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          {/* Risk Level Filter */}
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[130px] h-10 bg-slate-50 border-slate-200 focus:ring-emerald-600/20 rounded-xl font-medium text-slate-700 text-xs">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">All Risk Tiers</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 animate-in fade-in">
          <span className="text-xs font-bold text-emerald-950 px-2">{selectedUsers.length} user(s) selected</span>
          <button
            onClick={handleBulkSuspend}
            className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#0d9488',
              color: '#ffffff',
              border: '1px solid #2dd4bf',
              boxShadow: '0 4px 10px 0 rgba(13,148,136,0.25)'
            }}
          >
            Suspend Selected
          </button>
          <button
            onClick={handleBulkUnsuspend}
            className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: '1px solid #22c55e',
              boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
            }}
          >
            Unsuspend Selected
          </button>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: '1px solid #ef4444',
              boxShadow: '0 4px 10px 0 rgba(220,38,38,0.25)'
            }}
          >
            <Trash2 className="h-3.5 w-3.5 text-white" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="w-12 text-center">
                <Checkbox 
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-bold text-slate-700">User</TableHead>
              <TableHead className="font-bold text-slate-700">Contact</TableHead>
              <TableHead className="font-bold text-slate-700">Assessments</TableHead>
              <TableHead className="font-bold text-slate-700">Score</TableHead>
              <TableHead className="font-bold text-slate-700">Risk Level</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-slate-500 font-medium">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
                    <span>Loading users directory...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-slate-400 font-medium">No users found.</TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const assessmentCount = user.assessments?.length || (user.report_json ? 1 : 0)
                const score = user.report_json?.overall?.score ?? (typeof user.score === 'number' ? user.score : null)
                const rating = user.report_json?.overall?.rating || user.risk_level

                return (
                  <TableRow key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-indigo-100">
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                            {(user.name || "U").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{user.name || "Unnamed User"}</p>
                          <p className="text-xs text-slate-400">Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium">
                        <p className="text-slate-800 font-semibold">{user.email}</p>
                        {user.age && <p className="text-slate-400">Age: {user.age} yrs</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => navigate(`/admin-panel/admin/assessments`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all hover:scale-105"
                        title="View user assessment history"
                      >
                        <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
                        {assessmentCount} attempt{assessmentCount !== 1 ? 's' : ''}
                      </button>
                    </TableCell>
                    <TableCell>
                      {score !== null ? (
                        <div className="font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg inline-block border border-slate-200">
                          {score}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {rating ? (
                        <StatusPill status={
                          rating.toLowerCase().includes('excellent') ? 'excellent' : 
                          rating.toLowerCase().includes('good') ? 'good' :
                          rating.toLowerCase().includes('moderate') ? 'moderate' : 'at_risk'
                        } />
                      ) : (
                        <span className="text-slate-400 text-xs">Unassessed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={
                        user.payment_status === 'suspended' ? 'suspended' :
                        user.payment_status === 'paid' ? 'active' : 
                        'inactive'
                      } />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-8 w-8 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 flex items-center justify-center transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-slate-200">
                          <DropdownMenuItem onClick={() => navigate(`/admin-panel/admin/users/${user.id}`)} className="font-medium">
                            <Eye className="h-4 w-4 mr-2 text-indigo-600" /> View Profile & Report
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin-panel/admin/assessments`)} className="font-medium">
                            <ClipboardList className="h-4 w-4 mr-2 text-purple-600" /> View Assessment History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete User
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
    </div>
  )
}
