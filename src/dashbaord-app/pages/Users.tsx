import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Download, MoreHorizontal, Eye, Trash2, Calendar, ArrowRight } from "lucide-react"
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

import { getUsers, deleteUser, updateUserStatus } from "@/services/api"

export default function Users() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true;
    if (statusFilter === 'paid') {
      matchesStatus = user.payment_status === 'paid';
    } else if (statusFilter === 'free') {
      matchesStatus = user.payment_status !== 'paid';
    }
    
    const userDate = user.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "";
    
    const matchesStartDate = !startDate || userDate >= startDate;
    const matchesEndDate = !endDate || userDate <= endDate;
    
    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
  })

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Users</h2>
          <p className="text-slate-500 font-medium">Manage all registered users on the platform.</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <Button onClick={fetchData} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold shadow-sm rounded-xl px-5 h-11">
            <Download className="h-4 w-4 mr-2 text-indigo-500" /> Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search name, email..." 
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto sm:ml-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl shadow-sm h-10 w-full sm:w-auto overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:border-indigo-600 transition-all">
            <div className="flex items-center px-3 bg-slate-100 border-r border-slate-200 text-slate-500 h-full">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">Date</span>
            </div>
            <Input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full sm:w-[130px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-3 text-sm font-medium text-slate-700"
              title="Start Date"
            />
            <div className="px-1 text-slate-300 h-full flex items-center bg-transparent border-0">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <Input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full sm:w-[130px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-3 text-sm font-medium text-slate-700"
              title="End Date"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-10 bg-slate-50 border-slate-200 focus:ring-indigo-600/20 rounded-xl font-medium text-slate-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
          <span className="text-sm font-medium">{selectedUsers.length} selected</span>
          <Button variant="outline" size="sm" onClick={handleBulkSuspend} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
            Suspend Selected
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkUnsuspend} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
            Unsuspend Selected
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
          </Button>
        </div>
      )}

      <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">
                <Checkbox 
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">Loading users...</TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No users found.</TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{(user.name || "U").substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name || "Unnamed"}</p>
                        <p className="text-xs text-muted-foreground">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{user.email}</p>
                      {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.report_json?.overall?.score ? (
                      <div className="font-bold text-lg">{user.report_json.overall.score}</div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.report_json?.overall?.rating ? (
                      <StatusPill status={
                        user.report_json.overall.rating.toLowerCase() === 'excellent' ? 'excellent' : 
                        user.report_json.overall.rating.toLowerCase() === 'good' ? 'good' :
                        user.report_json.overall.rating.toLowerCase() === 'moderate' ? 'moderate' : 'at_risk'
                      } />
                    ) : (
                      <span className="text-muted-foreground text-sm">Unknown</span>
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
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin-panel/admin/users/${user.id}`)}>
                          <Eye className="h-4 w-4 mr-2 text-primary" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
