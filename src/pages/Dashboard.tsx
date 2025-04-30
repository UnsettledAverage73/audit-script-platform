
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { AlertTriangle, Calendar, CheckCircle2, Clock, Download, ExternalLink, FileText, Server, ShieldAlert, ShieldCheck } from "lucide-react";
import { auditResults, operatingSystems, targetSystems } from "@/data/mockData";
import { AuditResult, TargetSystem } from "@/types";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

// Helper function to get operating system icon based on name
const getOSIcon = (osName: string) => {
  if (osName.toLowerCase().includes("windows")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
      </svg>
    );
  } else if (osName.toLowerCase().includes("ubuntu")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0 5.514-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2s10 4.486 10 10zM7 12c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"/>
      </svg>
    );
  } else if (osName.toLowerCase().includes("rhel")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.581 12.572a1.815 1.815 0 1 0 0-3.63 1.815 1.815 0 0 0 0 3.63zm-11.812-.921a2.559 2.559 0 1 1-5.117 0 2.559 2.559 0 0 1 5.117 0zM12 6.375a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25z"/>
      </svg>
    );
  }
  
  // Default icon
  return <Server className="w-5 h-5" />;
};

const Dashboard = () => {
  const [latestAudits, setLatestAudits] = useState<AuditResult[]>([]);
  const [systemStats, setSystemStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    critical: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      // Get latest audit results
      const sorted = [...auditResults].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setLatestAudits(sorted.slice(0, 5));
      
      // Calculate system stats
      const stats = {
        total: targetSystems.length,
        online: targetSystems.filter(sys => sys.status === "online").length,
        offline: targetSystems.filter(sys => sys.status === "offline").length,
        critical: 2, // Mocked critical systems count
      };
      setSystemStats(stats);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Data for compliance by OS chart
  const complianceByOS = [
    { name: "RHEL 8", score: 87, count: 3 },
    { name: "RHEL 9", score: 79, count: 1 },
    { name: "Ubuntu 20.04", score: 92, count: 2 },
    { name: "Ubuntu 22.04", score: 88, count: 2 },
    { name: "Windows 10", score: 76, count: 5 },
    { name: "Windows 11", score: 78, count: 3 },
  ];

  // Data for compliance level pie chart
  const complianceData = [
    { name: "Compliant", value: 65 },
    { name: "Warning", value: 23 },
    { name: "Non-Compliant", value: 12 },
  ];

  // Data for compliance trend
  const complianceTrend = [
    { name: "Week 1", score: 72 },
    { name: "Week 2", score: 75 },
    { name: "Week 3", score: 80 },
    { name: "Week 4", score: 85 },
    { name: "Week 5", score: 82 },
    { name: "Week 6", score: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-3">
          <Button className="bg-navy-700 hover:bg-navy-900" size="sm">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Run New Audit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Systems
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.online} online, {systemStats.offline} offline
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Compliance
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <Progress value={83} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Findings
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-alert-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alert-500">12</div>
            <p className="text-xs text-muted-foreground">
              On {systemStats.critical} systems
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Next Scheduled Audit
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">
              In 4 hours (8:00 PM)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Overview Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>
              Average compliance score across all systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="os" className="space-y-4">
              <TabsList>
                <TabsTrigger value="os">By OS</TabsTrigger>
                <TabsTrigger value="trend">Trend</TabsTrigger>
              </TabsList>
              <TabsContent value="os" className="space-y-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={complianceByOS}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        name="Compliance Score (%)"
                        dataKey="score"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="trend" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={complianceTrend}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      name="Average Score (%)"
                      dataKey="score"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Findings Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle>Findings Distribution</CardTitle>
            <CardDescription>
              Distribution of compliance findings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-3">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
              <p className="text-sm">Compliant</p>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <p className="text-sm">Warning</p>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <p className="text-sm">Failed</p>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Audit Results</CardTitle>
              <CardDescription>
                Latest benchmark audits across your systems
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/history">
                View All
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">System</th>
                  <th className="py-3 px-4 text-left font-medium">Benchmark</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Score</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {latestAudits.map((audit) => (
                  <tr key={audit.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-navy-700 mr-2">
                          {getOSIcon(audit.osInfo.name)}
                        </span>
                        <div>
                          <p className="font-medium">{audit.systemName}</p>
                          <p className="text-xs text-muted-foreground">
                            {audit.osInfo.name} {audit.osInfo.version}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium truncate max-w-[200px]">
                        {audit.benchmarkInfo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        v{audit.benchmarkInfo.version}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(audit.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {audit.status === "completed" ? (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                          <span>Completed</span>
                        </div>
                      ) : audit.status === "failed" ? (
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-alert-500" />
                          <span>Failed</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="h-4 w-4 mr-2 rounded-full border-2 border-navy-600 border-t-transparent animate-spin"></span>
                          <span>In Progress</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {audit.status === "completed" ? (
                        <div className="flex flex-col">
                          <span 
                            className={`font-bold ${
                              audit.complianceScore >= 90
                                ? "text-emerald-500"
                                : audit.complianceScore >= 70
                                ? "text-amber-500"
                                : "text-alert-500"
                            }`}
                          >
                            {audit.complianceScore}%
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                audit.complianceScore >= 90
                                  ? "bg-emerald-500"
                                  : audit.complianceScore >= 70
                                  ? "bg-amber-500"
                                  : "bg-alert-500"
                              }`}
                              style={{ width: `${audit.complianceScore}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {audit.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-3 w-3" />
                          Report
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
