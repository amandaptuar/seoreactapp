import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  FileText, Download, ExternalLink, RefreshCw, Search,
  TrendingUp, CheckCircle2, AlertCircle, Eye, User, Calendar,
  ArrowRight, Award, BarChart3, Activity, Clock, ShieldCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPICard } from "@/components/custom/KPICard"
import { getUsers } from "@/services/api"

export default function Reports() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [pdfFilter, setPdfFilter] = useState("all")
  const [scoreFilter, setScoreFilter] = useState("all")
  const [activeReportDetail, setActiveReportDetail] = useState<any | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch (error) {
      console.error("Failed to fetch reports", error)
    } finally {
      setLoading(false)
    }
  }

  // Compile all reports across all users
  const allReports = useMemo(() => {
    const list: any[] = []
    users.forEach(user => {
      const userAssessments = user.assessments && user.assessments.length > 0
        ? user.assessments
        : (user.report_json ? [{
            id: `rep-${user.id}-primary`,
            created_at: user.created_at,
            report_json: user.report_json,
            pdf_url: user.pdf_url
          }] : [])

      userAssessments.forEach((assessment: any, index: number) => {
        const report = assessment.report_json || {}
        const score = typeof report.overall === 'object'
          ? (report.overall?.score ?? 0)
          : (Number(report.overall) || (typeof user.score === 'number' ? user.score : 0))

        const rating = typeof report.overall === 'object'
          ? (report.overall?.rating ?? 'Standard')
          : (user.risk_level || 'Standard')

        list.push({
          id: assessment.id || `rep-${user.id}-${index}`,
          userId: user.id,
          userName: user.name || "Unnamed User",
          userEmail: user.email || "No email",
          userAge: user.age || "N/A",
          userGender: user.gender || "N/A",
          paymentStatus: user.payment_status || "free",
          createdAt: assessment.created_at || user.created_at || new Date().toISOString(),
          attemptIndex: userAssessments.length - index,
          totalAttempts: userAssessments.length,
          score: Math.round(score),
          rating: rating,
          reportJson: report,
          pdfUrl: assessment.pdf_url || user.pdf_url || null,
          domains: report.domains || {},
          lifestyleImpacts: report.lifestyleImpacts || {},
          cognitiveAge: report.cognitiveAge || null
        })
      })
    })

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [users])

  // Filtered reports
  const filteredReports = useMemo(() => {
    return allReports.filter(rep => {
      const matchesSearch =
        rep.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesPdf = true
      if (pdfFilter === 'available') matchesPdf = Boolean(rep.pdfUrl)
      if (pdfFilter === 'pending') matchesPdf = !rep.pdfUrl

      let matchesScore = true
      if (scoreFilter === 'optimal') matchesScore = rep.score >= 75
      if (scoreFilter === 'moderate') matchesScore = rep.score >= 50 && rep.score < 75
      if (scoreFilter === 'risk') matchesScore = rep.score < 50

      return matchesSearch && matchesPdf && matchesScore
    })
  }, [allReports, searchTerm, pdfFilter, scoreFilter])

  // User Progress Summaries
  const userProgressSummaries = useMemo(() => {
    return users.map(user => {
      const userAssessments = allReports
        .filter(r => r.userId === user.id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

      const totalAttempts = userAssessments.length
      const initialScore = userAssessments[0]?.score || 0
      const latestScore = userAssessments[userAssessments.length - 1]?.score || 0
      const scoreDelta = latestScore - initialScore
      const latestRating = userAssessments[userAssessments.length - 1]?.rating || "Standard"
      const hasPdf = userAssessments.some(a => a.pdfUrl)

      return {
        userId: user.id,
        userName: user.name || "Unnamed User",
        userEmail: user.email,
        totalAttempts,
        initialScore,
        latestScore,
        scoreDelta,
        latestRating,
        hasPdf,
        assessments: userAssessments
      }
    }).filter(u => u.totalAttempts > 0)
  }, [users, allReports])

  const totalReportsCount = allReports.length
  const totalPdfsCount = allReports.filter(r => r.pdfUrl).length
  const avgScore = totalReportsCount > 0
    ? Math.round(allReports.reduce((acc, curr) => acc + curr.score, 0) / totalReportsCount)
    : 0
  const totalUsersWithReports = userProgressSummaries.length

  const getDownloadUrl = (url: string) => {
    if (!url) return ""
    return url.includes("?") ? `${url}&download=true` : `${url}?download=true`
  }

  const exportReportsCSV = () => {
    const headers = ["Report ID", "User Name", "Email", "Submission Date", "Attempt #", "Score", "Rating", "PDF URL"]
    const rows = filteredReports.map(r => [
      `"${r.id}"`,
      `"${r.userName.replace(/"/g, '""')}"`,
      `"${r.userEmail.replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
      `"${r.attemptIndex}"`,
      `"${r.score}"`,
      `"${r.rating}"`,
      `"${r.pdfUrl || 'Not Generated'}"`
    ].join(','))

    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `limitless_reports_export_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* ===== HERO BANNER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Reports & Progress Hub
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Assessment Reports & Progress Tracking</h2>
          <p className="text-slate-500 font-medium">Access certified PDF reports, review longitudinal progress tracking, and inspect assessment summaries.</p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          {/* GREEN Button for CSV */}
          <button
            onClick={exportReportsCSV}
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
            onClick={fetchUsers}
            disabled={loading}
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

      {/* ===== METRIC CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Reports"
          value={totalReportsCount.toString()}
          delta={`${totalUsersWithReports} active participants`}
          deltaType="positive"
          icon={FileText}
        />
        <KPICard
          title="Certified PDF Reports"
          value={totalPdfsCount.toString()}
          delta={`${totalReportsCount > 0 ? Math.round((totalPdfsCount / totalReportsCount) * 100) : 0}% generation rate`}
          deltaType="positive"
          icon={Award}
        />
        <KPICard
          title="Avg Cognitive Score"
          value={`${avgScore} / 100`}
          delta={avgScore >= 70 ? "Optimal performance" : "Standard baseline"}
          deltaType={avgScore >= 70 ? "positive" : "neutral"}
          icon={TrendingUp}
        />
        <KPICard
          title="Progress Tracked"
          value={userProgressSummaries.filter(u => u.totalAttempts > 1).length.toString()}
          delta="Multi-attempt participants"
          deltaType="positive"
          icon={Activity}
        />
      </div>

      {/* ===== TABS ===== */}
      <Tabs defaultValue="reports-feed" className="w-full">
        <TabsList className="grid w-full max-w-[500px] grid-cols-2 mb-6">
          <TabsTrigger value="reports-feed" className="font-bold text-sm">
            All Generated Reports ({filteredReports.length})
          </TabsTrigger>
          <TabsTrigger value="progress-tracking" className="font-bold text-sm">
            Progress Tracking ({userProgressSummaries.length})
          </TabsTrigger>
        </TabsList>

        {/* ==================================================== */}
        {/* TAB 1: ALL USER REPORTS & PDFS                       */}
        {/* ==================================================== */}
        <TabsContent value="reports-feed" className="space-y-6 m-0">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search user name, email..."
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">
              <Select value={pdfFilter} onValueChange={setPdfFilter}>
                <SelectTrigger className="w-[150px] h-10 bg-slate-50 border-slate-200 rounded-xl font-bold text-slate-700 text-xs">
                  <SelectValue placeholder="PDF Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="all">All PDF Statuses</SelectItem>
                  <SelectItem value="available">PDF Ready ({totalPdfsCount})</SelectItem>
                  <SelectItem value="pending">PDF Pending ({totalReportsCount - totalPdfsCount})</SelectItem>
                </SelectContent>
              </Select>

              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[160px] h-10 bg-slate-50 border-slate-200 rounded-xl font-bold text-slate-700 text-xs">
                  <SelectValue placeholder="Score Bracket" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="all">All Score Tiers</SelectItem>
                  <SelectItem value="optimal">Optimal (75 - 100)</SelectItem>
                  <SelectItem value="moderate">Moderate (50 - 74)</SelectItem>
                  <SelectItem value="risk">At Risk (Below 50)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/75">
                <TableRow>
                  <TableHead className="w-[280px] font-bold text-slate-700">User / Participant</TableHead>
                  <TableHead className="font-bold text-slate-700">Assessment Date</TableHead>
                  <TableHead className="font-bold text-slate-700">Attempt #</TableHead>
                  <TableHead className="font-bold text-slate-700">Score & Rating</TableHead>
                  <TableHead className="font-bold text-slate-700">PDF Report</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500 font-medium">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="h-6 w-6 animate-spin text-orange-600" />
                        <span>Loading generated reports...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-400 font-medium">
                      No reports match the current filter criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-slate-50/60 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 font-black flex items-center justify-center text-sm shadow-sm border border-orange-200 shrink-0">
                            {report.userName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">{report.userName}</p>
                            <p className="text-xs text-slate-500">{report.userEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-semibold">
                          <p className="text-slate-800">{new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          <p className="text-slate-400">{new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          report.attemptIndex > 1
                            ? 'bg-orange-100 text-orange-800 border border-orange-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          Attempt #{report.attemptIndex}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                            report.score >= 75 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            report.score >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {report.score} pts
                          </span>
                          <span className="text-xs font-semibold text-slate-600">{report.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.pdfUrl ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Certified PDF Ready
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                            <Clock className="w-3 h-3" /> Preview Ready
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* LIGHT GREEN Button for Summary */}
                          <button
                            onClick={() => setActiveReportDetail(report)}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                            style={{
                              backgroundColor: '#059669',
                              color: '#ffffff',
                              border: '1px solid #34d399',
                              boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                            }}
                            title="Inspect Assessment Summary"
                          >
                            <Eye className="h-3.5 w-3.5 text-white" />
                            <span>Summary</span>
                          </button>

                          {report.pdfUrl ? (
                            <>
                              {/* GREEN Button for View PDF */}
                              <a
                                href={report.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                                style={{
                                  backgroundColor: '#16a34a',
                                  color: '#ffffff',
                                  border: '1px solid #22c55e',
                                  boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                                }}
                              >
                                <ExternalLink className="h-3.5 w-3.5 text-white" />
                                <span>View PDF</span>
                              </a>
                              {/* GREEN Button for Download */}
                              <a
                                href={getDownloadUrl(report.pdfUrl)}
                                download
                                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                                style={{
                                  backgroundColor: '#16a34a',
                                  color: '#ffffff',
                                  border: '1px solid #22c55e',
                                  boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                                }}
                                title="Download PDF"
                              >
                                <Download className="h-3.5 w-3.5 text-white" />
                              </a>
                            </>
                          ) : (
                            /* LIGHT GREEN Button for Generate PDF */
                            <button
                              onClick={() => navigate(`/admin-panel/admin/users/${report.userId}`)}
                              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                              style={{
                                backgroundColor: '#059669',
                                color: '#ffffff',
                                border: '1px solid #34d399',
                                boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                              }}
                            >
                              <span>Generate PDF</span>
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ==================================================== */}
        {/* TAB 2: PROGRESS TRACKING & LONGITUDINAL SUMMARY      */}
        {/* ==================================================== */}
        <TabsContent value="progress-tracking" className="space-y-6 m-0">
          <Card className="border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
            <CardHeader>
              <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Participant Longitudinal Progress Tracking
              </CardTitle>
              <CardDescription>
                Track individual cognitive score trajectory, compare initial baseline against latest assessments, and monitor progress over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-slate-200/70 rounded-2xl overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="font-bold text-slate-700">Participant</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Total Attempts</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Initial Score</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Latest Score</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Score Delta</TableHead>
                      <TableHead className="font-bold text-slate-700">Latest Rating</TableHead>
                      <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userProgressSummaries.map((summary) => (
                      <TableRow key={summary.userId} className="hover:bg-slate-50/60 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-200">
                              {summary.userName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-slate-900">{summary.userName}</p>
                              <p className="text-xs text-slate-500">{summary.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-800">
                            {summary.totalAttempts} attempt{summary.totalAttempts > 1 ? 's' : ''}
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-bold text-sm text-slate-700">
                          {summary.initialScore}
                        </TableCell>
                        <TableCell className="text-center font-black text-sm text-slate-900">
                          {summary.latestScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {summary.totalAttempts > 1 ? (
                            <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                              summary.scoreDelta >= 0
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {summary.scoreDelta >= 0 ? `+${summary.scoreDelta}` : summary.scoreDelta} pts
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">Initial Baseline</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {summary.latestRating}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {/* LIGHT GREEN Button for View Full Profile */}
                          <button
                            onClick={() => navigate(`/admin-panel/admin/users/${summary.userId}`)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                            style={{
                              backgroundColor: '#059669',
                              color: '#ffffff',
                              border: '1px solid #34d399',
                              boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                            }}
                          >
                            <span>View Full Profile</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ==================================================== */}
      {/* MODAL: ASSESSMENT REPORT & PROGRESS SUMMARY          */}
      {/* ==================================================== */}
      {activeReportDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Assessment & Report Summary</h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {activeReportDetail.userName} ({activeReportDetail.userEmail}) • Attempt #{activeReportDetail.attemptIndex}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveReportDetail(null)}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors border border-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Overall Score</span>
                  <span className="text-4xl font-black text-emerald-950 my-1">{activeReportDetail.score}</span>
                  <span className="text-xs text-emerald-700 font-semibold">out of 100</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Rating</span>
                  <span className="text-2xl font-black text-slate-900 my-1.5">{activeReportDetail.rating}</span>
                  <span className="text-xs text-slate-500 font-semibold">Verified baseline</span>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Cognitive Age</span>
                  <span className="text-2xl font-black text-teal-950 my-1.5">
                    {activeReportDetail.cognitiveAge?.estimatedCognitiveAge || 'Optimal'} yrs
                  </span>
                  <span className="text-xs text-teal-700 font-semibold">
                    Actual: {activeReportDetail.cognitiveAge?.actualAge || activeReportDetail.userAge} yrs
                  </span>
                </div>
              </div>

              {/* Cognitive Domains */}
              {activeReportDetail.domains && Object.keys(activeReportDetail.domains).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Cognitive Domains</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeReportDetail.domains).map(([domain, val]: [string, any]) => {
                      const domainScore = typeof val === 'object' && val !== null ? (val.score ?? val.value ?? 0) : Number(val) || 0
                      return (
                        <div key={domain} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 capitalize">{domain.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-sm font-black text-emerald-700">{domainScore} %</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              {/* RED Button for Close */}
              <button
                onClick={() => setActiveReportDetail(null)}
                className="flex items-center justify-center px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: '1px solid #ef4444',
                  boxShadow: '0 4px 10px 0 rgba(220,38,38,0.25)'
                }}
              >
                Close
              </button>
              <div className="flex items-center gap-3">
                {activeReportDetail.pdfUrl && (
                  /* GREEN Button for Certified PDF */
                  <a
                    href={activeReportDetail.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                    style={{
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      border: '1px solid #22c55e',
                      boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                    }}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                    <span>Open Certified PDF</span>
                  </a>
                )}
                {/* LIGHT GREEN Button for Full Dashboard */}
                <button
                  onClick={() => {
                    const uid = activeReportDetail.userId
                    setActiveReportDetail(null)
                    navigate(`/admin-panel/admin/users/${uid}`)
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    border: '1px solid #34d399',
                    boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                  }}
                >
                  <span>Open Full Dashboard →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
