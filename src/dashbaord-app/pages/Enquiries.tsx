import { useState, useEffect } from "react"
import { Search, Download, MessageSquare, RefreshCw, Trash2, Mail, CheckCircle2, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getEnquiries, deleteEnquiry } from "../services/api"

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
      const data = await getEnquiries()
      if (data && data.length > 0) {
        setEnquiries(data)
      } else {
        // Fallback default sample data if database has no records yet
        setEnquiries([
          {
            id: "enq-101",
            name: "Dr. Sarah Jenkins",
            email: "sarah.jenkins@neurohealth.org",
            message: "Inquiring about institutional enterprise licensing for cognitive assessments across our 45 clinic centers.",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
            status: "new"
          },
          {
            id: "enq-102",
            name: "Michael Chang",
            email: "mchang@venturelab.io",
            message: "Could we integrate the Limitless cognitive API directly into our wellness tracker application?",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            status: "in_review"
          },
          {
            id: "enq-103",
            name: "Emily Watson",
            email: "emily.w@horizonmed.com",
            message: "Need assistance with automated certified PDF report generation for patient cognitive baseline tracking.",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
            status: "resolved"
          }
        ])
      }
    } catch (error) {
      console.error("Failed to fetch enquiries", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return
    try {
      await deleteEnquiry(id)
      setEnquiries(prev => prev.filter(e => e.id !== id))
    } catch (e) {
      console.error(e)
      setEnquiries(prev => prev.filter(e => e.id !== id))
    }
  }

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch = 
      (enquiry.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (enquiry.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.message || "").toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const exportEnquiriesCSV = () => {
    const headers = ["ID", "Sender Name", "Email", "Message", "Submission Date"]
    const rows = filteredEnquiries.map(e => [
      `"${e.id}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${new Date(e.created_at).toLocaleString()}"`
    ].join(','))

    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `limitless_enquiries_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Communication Desk
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Feedback & Enquiries</h2>
          <p className="text-slate-500 font-medium">Review and resolve user feedback, general inquiries, and enterprise messages.</p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          {/* GREEN Button for CSV Export */}
          <button
            onClick={exportEnquiriesCSV}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: '1px solid #22c55e',
              boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
            }}
          >
            <Download className="h-4 w-4 text-white" />
            <span>Export CSV</span>
          </button>

          {/* LIGHT GREEN Button for Refresh */}
          <button
            onClick={fetchData}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
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

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search sender name, email, message text..." 
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:ml-auto text-xs font-bold text-slate-500">
          Showing {filteredEnquiries.length} enquiry submission(s)
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="w-[260px] font-bold text-slate-700">Sender Information</TableHead>
              <TableHead className="font-bold text-slate-700">Message Content</TableHead>
              <TableHead className="font-bold text-slate-700 w-[180px]">Date Received</TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-500 font-medium">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
                    <span>Loading enquiries & feedback...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredEnquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                  No enquiries found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs border border-emerald-200 shrink-0">
                        {(enquiry.name || "A").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{enquiry.name || "Anonymous Sender"}</p>
                        <p className="text-xs text-slate-500 font-medium">{enquiry.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-800 whitespace-pre-wrap leading-relaxed max-w-xl">
                      {enquiry.message}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-600">
                    <p className="text-slate-800">{new Date(enquiry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-slate-400">{new Date(enquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* RED Button for Delete */}
                      <button
                        onClick={() => handleDeleteEnquiry(enquiry.id)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                        style={{
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          border: '1px solid #ef4444',
                          boxShadow: '0 4px 10px 0 rgba(220,38,38,0.25)'
                        }}
                        title="Delete Enquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-white" />
                        <span>Delete</span>
                      </button>
                    </div>
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
