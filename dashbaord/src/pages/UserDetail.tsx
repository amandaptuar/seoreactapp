import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Activity, BrainCircuit, Download, ExternalLink, Calendar, Phone, ShieldAlert, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusPill } from "@/components/custom/StatusPill"
import { CognitiveRadar } from "@/components/custom/CognitiveRadar"
import { TrendChart } from "@/components/custom/TrendChart"
import { getUserById } from "@/services/api"

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (id) fetchUser()
  }, [id])

  const fetchUser = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getUserById(id!)
      setUser(data)
    } catch (err: any) {
      setError(err.message || "Failed to load user")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  }

  if (error || !user) {
    return (
      <div className="flex flex-col h-[400px] items-center justify-center gap-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <div>
          <h3 className="text-lg font-bold">User Not Found</h3>
          <p className="text-muted-foreground">{error || "The user data could not be loaded."}</p>
        </div>
        <Button onClick={() => navigate("/admin/users")}>Go Back</Button>
      </div>
    )
  }

  // Safe defaults for report JSON
  const report = user.report_json || {}
  const hasReport = !!report.overall

  const cognitiveAge = {
    actualAge: user.age || 0,
    estimatedCognitiveAge: report.overall?.score ? Math.max(20, Math.floor(100 - report.overall.score)) : 0
  }

  const getDownloadUrl = (url: string) => {
    if (!url) return "";
    return url.includes("?") ? `${url}&download=` : `${url}?download=`;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">View and manage detailed information for {user.name || "this user"}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Summary Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-muted">
              <AvatarFallback className="text-2xl">{(user.name || "U").substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user.name || "Unnamed User"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <StatusPill status={user.payment_status === 'paid' ? 'active' : (user.payment_status || 'inactive')} />
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {user.payment_status === 'paid' ? 'Paid ($19)' : 'Free/Demo'}
              </span>
            </div>
            
            <div className="w-full pt-4 border-t space-y-3 text-sm text-left">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /> {user.phone || "No phone"}</div>
              <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-muted-foreground" /> Joined: {new Date(user.created_at).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Card className="md:col-span-2">
          <Tabs defaultValue="cognitive" className="w-full">
            <CardHeader className="border-b px-6 py-4">
              <TabsList className="flex flex-col sm:flex-row w-full h-auto gap-2">
                <TabsTrigger className="w-full sm:w-auto" value="profile">Profile Details</TabsTrigger>
                <TabsTrigger className="w-full sm:w-auto" value="cognitive">Cognitive Report</TabsTrigger>
                <TabsTrigger className="w-full sm:w-auto" value="activity">Activity</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-0">
              
              <TabsContent value="profile" className="p-6 m-0 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-muted-foreground">Payment Status</p><p className="font-medium capitalize">{user.payment_status || "None"}</p></div>
                    <div><p className="text-muted-foreground">Password Reset</p><p className="font-medium">{user.password_reset_required ? "Required" : "Done"}</p></div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cognitive" className="p-6 m-0 space-y-8">
                {!hasReport ? (
                  <div className="text-center py-12">
                    <BrainCircuit className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-lg font-semibold">No Report Data</h3>
                    <p className="text-muted-foreground">This user has not completed an assessment yet, or their report data is empty.</p>
                  </div>
                ) : (
                  <>
                    {/* Overall Score */}
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-muted/30 p-6 rounded-lg border">
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs">Overall Cognitive Score</p>
                        <div className="flex items-end gap-4 mt-2 justify-center md:justify-start">
                          <span className="text-6xl font-black text-primary">{report.overall?.score || 0}</span>
                          <StatusPill status={
                            report.overall?.rating?.toLowerCase() === 'excellent' ? 'excellent' : 
                            report.overall?.rating?.toLowerCase() === 'good' ? 'good' :
                            report.overall?.rating?.toLowerCase() === 'moderate' ? 'moderate' : 'at_risk'
                          } className="mb-2" />
                        </div>
                      </div>
                      <div className="flex-1 text-center border-l md:border-l-2 md:pl-6">
                        <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs">Cognitive Age</p>
                        <div className="flex items-baseline gap-2 justify-center mt-2">
                          <span className="text-4xl font-bold">{cognitiveAge.estimatedCognitiveAge}</span>
                          <span className="text-sm text-muted-foreground">vs {cognitiveAge.actualAge} actual</span>
                        </div>
                      </div>
                    </div>

                    {/* Radar & Lifestyle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {report.domains && report.domains.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary" /> Domains Profile</h4>
                          <div className="h-[300px] border rounded-lg bg-card p-4">
                            <CognitiveRadar data={report.domains} />
                          </div>
                        </div>
                      )}
                      
                      {report.lifestyleImpacts && report.lifestyleImpacts.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Lifestyle Impacts</h4>
                          <div className="h-[300px] border rounded-lg bg-card p-4">
                            <TrendChart 
                              type="bar" 
                              data={report.lifestyleImpacts} 
                              xAxisKey="factor"
                              dataKeys={[
                                { key: "score", name: "Impact Level", color: "hsl(var(--warning))" }
                              ]}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Risks and Recs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {report.riskIndicators && report.riskIndicators.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2 text-destructive"><ShieldAlert className="h-4 w-4" /> Risk Indicators</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {report.riskIndicators.map((risk: string, i: number) => <li key={i}>{risk}</li>)}
                          </ul>
                        </div>
                      )}
                      {report.recommendations && report.recommendations.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2 text-success"><User className="h-4 w-4" /> Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {report.recommendations.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* PDF Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                  {user.pdf_url ? (
                    <>
                      <Button asChild className="w-full sm:w-auto"><a href={user.pdf_url} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> View PDF Report</a></Button>
                      <Button variant="outline" asChild className="w-full sm:w-auto"><a href={getDownloadUrl(user.pdf_url)} download><Download className="h-4 w-4 mr-2" /> Download PDF</a></Button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No PDF report available for this user.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="p-6 m-0">
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-muted-foreground text-xs">Registered via platform</p>
                    </div>
                    <span className="text-muted-foreground">{new Date(user.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </TabsContent>
              
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
