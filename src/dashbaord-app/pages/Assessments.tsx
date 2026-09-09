import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  ClipboardList, Search, Download, Calendar, ArrowRight, Eye,
  FileText, ExternalLink, RefreshCw, Activity, Award, AlertTriangle,
  TrendingUp, ArrowUpRight, ArrowDownRight, User, CheckCircle2,
  Clock, Filter, Layers, BarChart2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPICard } from "@/components/custom/KPICard"
import { TrendChart } from "@/components/custom/TrendChart"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import { getUsers } from "@/services/api"

export default function Assessments() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [scoreFilter, setScoreFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<string>("all")
  const [activeModalAssessment, setActiveModalAssessment] = useState<any | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data || [])
    } catch (error) {
      console.error("Failed to fetch assessment data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Flatten all assessments across all users with user references
  const allAssessments = useMemo(() => {
    const list: any[] = []
    users.forEach(user => {
      const userAssessments = user.assessments && user.assessments.length > 0
        ? user.assessments
        : (user.report_json ? [{
            id: `ass-${user.id}-primary`,
            created_at: user.created_at,
            report_json: user.report_json,
            pdf_url: user.pdf_url
          }] : [])

      userAssessments.forEach((ass: any, index: number) => {
        const report = ass.report_json || {}
        const score = typeof report.overall === 'object'
          ? (report.overall?.score ?? 0)
          : (Number(report.overall) || (typeof user.score === 'number' ? user.score : 0))

        const rating = typeof report.overall === 'object'
          ? (report.overall?.rating ?? 'Standard')
          : (user.risk_level || 'Standard')

        list.push({
          id: ass.id || `ass-${user.id}-${index}`,
          assessmentIndex: userAssessments.length - index, // 1st attempt, 2nd attempt, etc.
          totalAttemptsByUser: userAssessments.length,
          userId: user.id,
          userName: user.name || "Anonymous User",
          userEmail: user.email || "No email",
          userAge: user.age || "N/A",
          userGender: user.gender || "N/A",
          paymentStatus: user.payment_status || "free",
          createdAt: ass.created_at || user.created_at || new Date().toISOString(),
          score: Math.round(score),
          rating: rating,
          reportJson: report,
          pdfUrl: ass.pdf_url || user.pdf_url || null,
          domains: report.domains || {},
          lifestyleImpacts: report.lifestyleImpacts || {},
          cognitiveAge: report.cognitiveAge || null
        })
      })
    })

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [users])

  // Filtered assessment list
  const filteredAssessments = useMemo(() => {
    return allAssessments.filter(ass => {
      const matchesSearch =
        ass.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ass.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesScore = true
      if (scoreFilter === 'high') {
        matchesScore = ass.score >= 75
      } else if (scoreFilter === 'moderate') {
        matchesScore = ass.score >= 50 && ass.score < 75
      } else if (scoreFilter === 'risk') {
        matchesScore = ass.score < 50
      }

      const assDate = ass.createdAt ? new Date(ass.createdAt).toISOString().split('T')[0] : ""
      const matchesStartDate = !startDate || assDate >= startDate
      const matchesEndDate = !endDate || assDate <= endDate

      const matchesUser = selectedUserForHistory === 'all' || ass.userId === selectedUserForHistory

      return matchesSearch && matchesScore && matchesStartDate && matchesEndDate && matchesUser
    })
  }, [allAssessments, searchTerm, scoreFilter, startDate, endDate, selectedUserForHistory])

  // Aggregate KPIs
  const totalAssessmentsCount = allAssessments.length
  const avgScore = totalAssessmentsCount > 0
    ? Math.round(allAssessments.reduce((acc, curr) => acc + curr.score, 0) / totalAssessmentsCount)
    : 0

  const highRiskCount = allAssessments.filter(a => a.score < 50 || a.rating.toLowerCase().includes('risk')).length
  const retakesCount = allAssessments.filter(a => a.totalAttemptsByUser > 1).length
  const pdfGeneratedCount = allAssessments.filter(a => a.pdfUrl).length

  // Users with multiple assessment attempts for the history selector
  const usersWithAssessments = useMemo(() => {
    return users.filter(u => (u.assessments && u.assessments.length > 0) || u.report_json)
  }, [users])

  // Selected user's historical progression
  const selectedUserHistory = useMemo(() => {
    if (selectedUserForHistory === 'all') return []
    return allAssessments
      .filter(a => a.userId === selectedUserForHistory)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }, [allAssessments, selectedUserForHistory])

  // History Progression Chart Data for selected user
  const userHistoryChartData = useMemo(() => {
    return selectedUserHistory.map((item, idx) => ({
      attempt: `Attempt ${idx + 1} (${new Date(item.createdAt).toLocaleDateString()})`,
      score: item.score,
      date: new Date(item.createdAt).toLocaleDateString()
    }))
  }, [selectedUserHistory])

  const exportAssessmentsCSV = () => {
    const headers = ["Assessment ID", "User Name", "Email", "Date", "Score", "Rating", "Attempt #", "PDF URL"]
    const rows = filteredAssessments.map(a => [
      `"${a.id}"`,
      `"${a.userName.replace(/"/g, '""')}"`,
      `"${a.userEmail.replace(/"/g, '""')}"`,
      `"${new Date(a.createdAt).toLocaleString()}"`,
      `"${a.score}"`,
      `"${a.rating}"`,
      `"${a.assessmentIndex}"`,
      `"${a.pdfUrl || ''}"`
    ].join(','))

    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `limitless_assessments_export_${new Date().toISOString().split('T')[0]}.csv`
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
              <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
              Cognitive Assessment Hub
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Assessments & User History</h2>
          <p className="text-slate-500 font-medium">Track comprehensive cognitive test submissions, attempt histories, and performance analytics.</p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={exportAssessmentsCSV}
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

      {/* ===== KPIS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Assessments"
          value={totalAssessmentsCount.toString()}
          delta={`${usersWithAssessments.length} active participants`}
          deltaType="positive"
          icon={ClipboardList}
        />
        <KPICard
          title="Avg Cognitive Score"
          value={`${avgScore} / 100`}
          delta={avgScore >= 70 ? "Optimal Baseline" : "Needs Attention"}
          deltaType={avgScore >= 70 ? "positive" : "neutral"}
          icon={Award}
        />
        <KPICard
          title="At-Risk Submissions"
          value={highRiskCount.toString()}
          delta={highRiskCount > 0 ? "Requires Clinical Review" : "All Clear"}
          deltaType={highRiskCount > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
        />
        <KPICard
          title="PDF Reports Ready"
          value={pdfGeneratedCount.toString()}
          delta={`${totalAssessmentsCount > 0 ? Math.round((pdfGeneratedCount / totalAssessmentsCount) * 100) : 0}% generated`}
          deltaType="positive"
          icon={FileText}
        />
      </div>

      {/* ===== TABS: ALL ASSESSMENTS vs USER HISTORY EXPLORER ===== */}
      <Tabs defaultValue="all-assessments" className="w-full">
        <TabsList className="grid w-full max-w-[480px] grid-cols-2 mb-6">
          <TabsTrigger value="all-assessments" className="font-semibold text-sm">
            All Assessments ({filteredAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="user-history" className="font-semibold text-sm">
            User History Explorer
          </TabsTrigger>
        </TabsList>

        {/* ==================================================== */}
        {/* TAB 1: ALL ASSESSMENTS FEED & TABLE                 */}
        {/* ==================================================== */}
        <TabsContent value="all-assessments" className="space-y-6 m-0">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-5 rounded-2xl border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search user name or email..."
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:ml-auto">
              {/* Date Filter */}
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl shadow-sm h-10 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600/20 transition-all">
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
                <div className="px-1 text-emerald-600 h-full flex items-center bg-slate-100 border-x border-slate-200">
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

              {/* Score Range Filter */}
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[160px] h-10 bg-slate-50 border-slate-200 focus:ring-emerald-600/20 rounded-xl font-medium text-slate-700 text-xs">
                  <SelectValue placeholder="Score Bracket" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="all">All Score Tiers</SelectItem>
                  <SelectItem value="high">Optimal (75 - 100)</SelectItem>
                  <SelectItem value="moderate">Moderate (50 - 74)</SelectItem>
                  <SelectItem value="risk">At Risk (Below 50)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assessment Table */}
          <div className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-x-auto overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/75">
                <TableRow>
                  <TableHead className="w-[260px] font-bold text-slate-700">User</TableHead>
                  <TableHead className="font-bold text-slate-700">Submission Date</TableHead>
                  <TableHead className="font-bold text-slate-700">Attempt #</TableHead>
                  <TableHead className="font-bold text-slate-700">Cognitive Score</TableHead>
                  <TableHead className="font-bold text-slate-700">Risk Assessment</TableHead>
                  <TableHead className="font-bold text-slate-700">Plan</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-slate-500 font-medium">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
                        <span>Loading assessment records...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredAssessments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                      No assessment records match the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssessments.map((ass) => {
                    const isOptimal = ass.score >= 75
                    const isModerate = ass.score >= 50 && ass.score < 75
                    const isRisk = ass.score < 50

                    return (
                      <TableRow key={ass.id} className="hover:bg-slate-50/60 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                              {ass.userName.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 text-sm">{ass.userName}</span>
                              <span className="text-xs text-slate-500 font-medium">{ass.userEmail}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">
                              {new Date(ass.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(ass.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            ass.assessmentIndex > 1
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            Attempt #{ass.assessmentIndex}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                              isOptimal ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              isModerate ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {ass.score}
                            </div>
                            <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isOptimal ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${Math.min(100, ass.score)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            isOptimal ? 'bg-emerald-100/70 text-emerald-800' :
                            isModerate ? 'bg-amber-100/70 text-amber-800' :
                            'bg-rose-100/70 text-rose-800'
                          }`}>
                            {ass.rating}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider ${
                            ass.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {ass.paymentStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Explicit Assessment Diagnostics Button */}
                            <button
                              onClick={() => setActiveModalAssessment(ass)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                              style={{
                                backgroundColor: '#059669',
                                color: '#ffffff',
                                border: '1px solid #34d399',
                                boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                              }}
                              title="Inspect Assessment Diagnostics & Report"
                            >
                              <Eye className="h-3.5 w-3.5 text-white" />
                              <span>Assessment Diagnostics</span>
                            </button>
                            {ass.pdfUrl ? (
                              <a
                                href={ass.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                                style={{
                                  backgroundColor: '#16a34a',
                                  color: '#ffffff',
                                  border: '1px solid #22c55e',
                                  boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                                }}
                              >
                                <FileText className="h-3.5 w-3.5 text-white" />
                                <span>PDF</span>
                              </a>
                            ) : null}
                            <button
                              onClick={() => navigate(`/admin-panel/admin/users/${ass.userId}`)}
                              className="flex items-center justify-center w-8 h-8 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-sm transition-all hover:scale-105"
                              style={{
                                backgroundColor: '#ecfdf5',
                                border: '1px solid #a7f3d0'
                              }}
                              title="Go to full user profile"
                            >
                              <ArrowRight className="h-4 w-4 text-emerald-700" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ==================================================== */}
        {/* TAB 2: USER ASSESSMENT HISTORY EXPLORER              */}
        {/* ==================================================== */}
        <TabsContent value="user-history" className="space-y-6 m-0">
          {/* User selector card */}
          <Card className="border border-slate-200/60 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                Select User to Inspect Longitudinal History
              </CardTitle>
              <CardDescription>
                Track multiple assessment attempts, cognitive score changes over time, and compare individual domain metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-96">
                  <Select value={selectedUserForHistory} onValueChange={setSelectedUserForHistory}>
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200 font-semibold text-slate-800 rounded-xl">
                      <SelectValue placeholder="Choose a user..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 max-h-72">
                      <SelectItem value="all">-- Select a specific user --</SelectItem>
                      {usersWithAssessments.map(u => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name || "User"} ({u.email}) — {u.assessments?.length || 1} assessment(s)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedUserForHistory !== 'all' && (
                  <button
                    onClick={() => navigate(`/admin-panel/admin/users/${selectedUserForHistory}`)}
                    className="h-11 px-5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                      backgroundColor: '#059669',
                      color: '#ffffff',
                      border: '1px solid #34d399',
                      boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                    }}
                  >
                    <span>View Full Profile & Diagnostics</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedUserForHistory === 'all' ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/60 text-slate-500">
              <ClipboardList className="h-14 w-14 mx-auto text-indigo-400 mb-3 opacity-80" />
              <h3 className="text-lg font-black text-slate-900 mb-1">Select a user above to see their detailed history</h3>
              <p className="text-sm max-w-md mx-auto">
                Compare their test results across multiple dates, visualize score progression, and inspect each assessment attempt.
              </p>
            </div>
          ) : selectedUserHistory.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/60 text-slate-500">
              <p>No assessment records found for this user.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score progression chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border border-slate-200/60">
                  <CardHeader>
                    <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                      Cognitive Score Timeline & Trajectory
                    </CardTitle>
                    <CardDescription>
                      Progression across {selectedUserHistory.length} recorded assessment(s).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userHistoryChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="attempt" stroke="#94a3b8" fontSize={12} />
                        <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                        />
                        <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Quick Summary Card */}
                <Card className="border border-slate-200/60 bg-gradient-to-br from-indigo-900 to-slate-950 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-indigo-200">Participant Snapshot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Participant Name</span>
                      <p className="text-xl font-black text-white">{selectedUserHistory[0]?.userName}</p>
                      <p className="text-xs text-indigo-200">{selectedUserHistory[0]?.userEmail}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-indigo-800/60">
                      <div>
                        <span className="text-xs text-indigo-300 font-semibold">Total Attempts</span>
                        <p className="text-2xl font-black text-white">{selectedUserHistory.length}</p>
                      </div>
                      <div>
                        <span className="text-xs text-indigo-300 font-semibold">Latest Score</span>
                        <p className="text-2xl font-black text-emerald-400">
                          {selectedUserHistory[selectedUserHistory.length - 1]?.score || 0}
                        </p>
                      </div>
                    </div>
                    {selectedUserHistory.length > 1 && (
                      <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between text-xs font-semibold">
                        <span>Score Delta (Initial → Latest):</span>
                        <span className={
                          (selectedUserHistory[selectedUserHistory.length - 1]?.score - selectedUserHistory[0]?.score) >= 0
                            ? 'text-emerald-400 font-bold'
                            : 'text-rose-400 font-bold'
                        }>
                          {(selectedUserHistory[selectedUserHistory.length - 1]?.score - selectedUserHistory[0]?.score) >= 0 ? '+' : ''}
                          {selectedUserHistory[selectedUserHistory.length - 1]?.score - selectedUserHistory[0]?.score} pts
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* List of attempts */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900">Recorded Attempt Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedUserHistory.map((ass, idx) => (
                    <Card key={ass.id} className="border border-slate-200/80 hover:border-indigo-300 transition-all shadow-sm">
                      <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                            Attempt #{idx + 1}
                          </span>
                          <CardTitle className="text-base font-bold text-slate-900 mt-2">
                            {new Date(ass.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </CardTitle>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-md">
                          {ass.score}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-xs font-semibold border-b border-slate-100 pb-2">
                          <span className="text-slate-500">Risk Assessment:</span>
                          <span className="text-slate-800 font-bold">{ass.rating}</span>
                        </div>
                        {ass.cognitiveAge && (
                          <div className="flex justify-between text-xs font-semibold border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Cognitive vs Actual Age:</span>
                            <span className="text-indigo-600 font-bold">
                              {ass.cognitiveAge.estimatedCognitiveAge} yrs / {ass.cognitiveAge.actualAge || ass.userAge} yrs
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => setActiveModalAssessment(ass)}
                            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl text-white text-xs font-bold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                            style={{
                              backgroundColor: '#059669',
                              color: '#ffffff',
                              border: '1px solid #34d399',
                              boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                            }}
                          >
                            <Eye className="h-3.5 w-3.5 text-white" />
                            <span>Assessment Diagnostics</span>
                          </button>
                          {ass.pdfUrl && (
                            <a
                              href={ass.pdfUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="h-9 px-3 rounded-xl text-white text-xs font-bold flex items-center justify-center transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                              style={{
                                backgroundColor: '#16a34a',
                                color: '#ffffff',
                                border: '1px solid #22c55e',
                                boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                              }}
                              title="Open PDF"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-white" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ==================================================== */}
      {/* MODAL: ASSESSMENT REPORT & DIAGNOSTICS INSPECTOR     */}
      {/* ==================================================== */}
      {activeModalAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <ClipboardList className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white tracking-tight">Assessment Diagnostics</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Inspection
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {activeModalAssessment.userName} ({activeModalAssessment.userEmail}) • Attempt #{activeModalAssessment.assessmentIndex} • {new Date(activeModalAssessment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAssessment(null)}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors border border-slate-700 text-sm font-bold"
                title="Close Window"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Score & Rating row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Overall Score</span>
                  <span className="text-4xl font-black text-emerald-950 my-1">{activeModalAssessment.score}</span>
                  <span className="text-xs text-emerald-700 font-semibold">out of 100 max</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Rating</span>
                  <span className="text-2xl font-black text-slate-900 my-1.5">{activeModalAssessment.rating}</span>
                  <span className="text-xs text-slate-500 font-semibold">Validated baseline</span>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Cognitive Age</span>
                  <span className="text-2xl font-black text-teal-950 my-1.5">
                    {activeModalAssessment.cognitiveAge?.estimatedCognitiveAge || 'Optimal'} yrs
                  </span>
                  <span className="text-xs text-teal-700 font-semibold">
                    Actual: {activeModalAssessment.cognitiveAge?.actualAge || activeModalAssessment.userAge} yrs
                  </span>
                </div>
              </div>

              {/* Cognitive Domains */}
              {activeModalAssessment.domains && Object.keys(activeModalAssessment.domains).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Cognitive Domain Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeModalAssessment.domains).map(([domain, val]: [string, any]) => {
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

              {/* Lifestyle Impacts */}
              {activeModalAssessment.lifestyleImpacts && Object.keys(activeModalAssessment.lifestyleImpacts).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Lifestyle Impact Factors</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeModalAssessment.lifestyleImpacts).map(([factor, val]: [string, any]) => {
                      const factorLevel = typeof val === 'object' && val !== null ? (val.rating ?? val.value ?? 'Normal') : String(val)
                      return (
                        <div key={factor} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 capitalize">{factor.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-black text-slate-900 px-2 py-0.5 rounded-md bg-white border border-slate-200">{factorLevel}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveModalAssessment(null)}
                className="px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: '1px solid #ef4444',
                  boxShadow: '0 4px 10px 0 rgba(220,38,38,0.25)'
                }}
              >
                Close Window
              </button>
              <div className="flex items-center gap-3">
                {activeModalAssessment.pdfUrl && (
                  <a
                    href={activeModalAssessment.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
                    style={{
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      border: '1px solid #22c55e',
                      boxShadow: '0 4px 10px 0 rgba(22,163,74,0.25)'
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1 text-white" />
                    <span>Open PDF Report</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    const userId = activeModalAssessment.userId
                    setActiveModalAssessment(null)
                    navigate(`/admin-panel/admin/users/${userId}`)
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    border: '1px solid #34d399',
                    boxShadow: '0 4px 10px 0 rgba(5,150,105,0.25)'
                  }}
                >
                  <span>Go to User Dashboard →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
