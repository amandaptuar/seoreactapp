import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Download, MoreHorizontal, Eye, Trash2, Calendar, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusPill } from "@/components/custom/StatusPill"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getUsers, deleteUser } from "@/services/api"

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
      const { error } = await supabase.from('users').delete().in('id', selectedUsers)
      if (error) throw error
      setUsers(users.filter(u => !selectedUsers.includes(u.id)))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to delete users", error)
    }
  }

  const handleBulkSuspend = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to suspend ${selectedUsers.length} selected users?`)) return
    try {
      const { error } = await supabase.from('users').update({ payment_status: 'suspended' }).in('id', selectedUsers)
      if (error) throw error
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'suspended' } : u))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to suspend users", error)
    }
  }

  const handleBulkUnsuspend = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to unsuspend ${selectedUsers.length} selected users?`)) return
    try {
      const { error } = await supabase.from('users').update({ payment_status: 'paid' }).in('id', selectedUsers)
      if (error) throw error
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'paid' } : u))
      setSelectedUsers([])
    } catch (error) {
      console.error("Failed to unsuspend users", error)
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage all registered users on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchData}><Download className="h-4 w-4 mr-2" /> Refresh</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name, email..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto sm:ml-auto">
          <div className="flex items-center bg-background border rounded-md shadow-sm h-10 w-full sm:w-auto overflow-hidden focus-within:ring-1 focus-within:ring-ring transition-all">
            <div className="flex items-center px-3 bg-muted/50 border-r text-muted-foreground h-full">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Date</span>
            </div>
            <Input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full sm:w-[130px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-3 text-sm"
              title="Start Date"
            />
            <div className="px-1 text-muted-foreground/50 h-full flex items-center bg-transparent border-0">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <Input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full sm:w-[130px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent h-full px-3 text-sm"
              title="End Date"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
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

      <div className="border rounded-lg bg-card overflow-x-auto">
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
