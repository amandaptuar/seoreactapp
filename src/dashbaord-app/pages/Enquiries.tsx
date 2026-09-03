import { useState, useEffect } from "react"
import { Search, Download, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { getEnquiries } from "../services/api"

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
      // Backend returns enquiries newest-first
      setEnquiries(await getEnquiries() || [])
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
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Feedback & Enquiries</h2>
          <p className="text-slate-500 font-medium">Manage user feedback and incoming enquiries.</p>
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
            placeholder="Search name, email, or message..." 
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
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
