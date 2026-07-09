import { useState, useEffect } from "react"
import { Search, Download, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// We use the same supabase client from the main app
import { supabase } from "../../lib/supabase"

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState("")
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error;
      setEnquiries(data || [])
    } catch (error) {
      console.error("Failed to fetch enquiries", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch = 
      (enquiry.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (enquiry.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.message || "").toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Feedback & Enquiries</h2>
          <p className="text-muted-foreground">Manage user feedback and incoming enquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchData}><Download className="h-4 w-4 mr-2" /> Refresh</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name, email, or message..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead className="w-[50%]">Message</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">Loading enquiries...</TableCell>
              </TableRow>
            ) : filteredEnquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No enquiries found.</TableCell>
              </TableRow>
            ) : (
              filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-primary/10">
                        <AvatarFallback className="text-primary">
                          <MessageSquare className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{enquiry.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{enquiry.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm whitespace-pre-wrap">{enquiry.message}</div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {new Date(enquiry.created_at).toLocaleDateString()}
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
