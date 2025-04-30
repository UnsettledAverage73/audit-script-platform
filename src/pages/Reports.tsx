
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Calendar, Download, FileDown, FilePdf, FileSpreadsheet, FileText, Filter, Search } from "lucide-react";
import { auditResults, operatingSystems, targetSystems } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("compliance");

  const handleDownloadReport = (format: string) => {
    setLoading(true);
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: `Your ${selectedReportType} report has been generated in ${format.toUpperCase()} format.`,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex gap-2"
            onClick={() => handleDownloadReport('pdf')}
            disabled={loading}
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-navy-600 border-t-transparent animate-spin"></span>
            ) : (
              <FilePdf className="h-4 w-4" />
            )}
            PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex gap-2"
            onClick={() => handleDownloadReport('csv')}
            disabled={loading}
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-navy-600 border-t-transparent animate-spin"></span>
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            CSV
          </Button>
        </div>
      </div>
      
      {/* Report Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Configure and generate compliance reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select 
                defaultValue="compliance" 
                onValueChange={setSelectedReportType}
              >
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance">Compliance Summary</SelectItem>
                  <SelectItem value="findings">Detailed Findings</SelectItem>
                  <SelectItem value="systems">System Inventory</SelectItem>
                  <SelectItem value="trends">Compliance Trends</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="os-filter">Operating System</Label>
              <Select defaultValue="all">
                <SelectTrigger id="os-filter">
                  <SelectValue placeholder="Filter by OS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operating Systems</SelectItem>
                  {operatingSystems.map((os) => (
                    <SelectItem key={os.id} value={os.id}>
                      {os.name} {os.version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <DatePickerWithRange />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="system-filter">Target System</Label>
              <Select defaultValue="all">
                <SelectTrigger id="system-filter">
                  <SelectValue placeholder="Filter by system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Systems</SelectItem>
                  {targetSystems.map((system) => (
                    <SelectItem key={system.id} value={system.id}>
                      {system.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="benchmark-filter">CIS Benchmark</Label>
              <Select defaultValue="all">
                <SelectTrigger id="benchmark-filter">
                  <SelectValue placeholder="Filter by benchmark" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Benchmarks</SelectItem>
                  <SelectItem value="rhel8">CIS RHEL 8</SelectItem>
                  <SelectItem value="rhel9">CIS RHEL 9</SelectItem>
                  <SelectItem value="ubuntu2004">CIS Ubuntu 20.04</SelectItem>
                  <SelectItem value="ubuntu2204">CIS Ubuntu 22.04</SelectItem>
                  <SelectItem value="win10">CIS Windows 10</SelectItem>
                  <SelectItem value="win11">CIS Windows 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status-filter">Compliance Status</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pass">Compliant</SelectItem>
                  <SelectItem value="fail">Non-Compliant</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-navy-700 hover:bg-navy-900" disabled={loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>
            Access previously generated reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recents">
            <TabsList className="mb-4">
              <TabsTrigger value="recents">Recent Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recents">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-9 mb-4"
                />
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    id: "rep1",
                    name: "Weekly Compliance Summary",
                    type: "Compliance",
                    date: "2023-04-29",
                    format: "PDF",
                  },
                  {
                    id: "rep2",
                    name: "RHEL 8 Servers - Full Audit",
                    type: "Findings",
                    date: "2023-04-28",
                    format: "CSV",
                  },
                  {
                    id: "rep3",
                    name: "Windows 10 Workstations",
                    type: "Compliance",
                    date: "2023-04-27",
                    format: "PDF",
                  },
                  {
                    id: "rep4",
                    name: "Ubuntu Servers - Critical Findings",
                    type: "Findings",
                    date: "2023-04-26",
                    format: "CSV",
                  },
                  {
                    id: "rep5",
                    name: "Monthly Executive Summary",
                    type: "Trends",
                    date: "2023-04-01",
                    format: "PDF",
                  },
                ].map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-md ${
                        report.format === "PDF" 
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        {report.format === "PDF" ? (
                          <FilePdf className="h-5 w-5" />
                        ) : (
                          <FileSpreadsheet className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.type} Report | Generated on {report.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="space-y-4">
                {[
                  {
                    id: "sched1",
                    name: "Weekly Compliance Summary",
                    frequency: "Every Monday at 8:00 AM",
                    recipients: "security-team@example.com",
                    format: "PDF",
                  },
                  {
                    id: "sched2",
                    name: "Monthly Executive Report",
                    frequency: "1st of every month at 9:00 AM",
                    recipients: "executives@example.com",
                    format: "PDF",
                  },
                  {
                    id: "sched3",
                    name: "Daily Critical Findings",
                    frequency: "Daily at 7:00 AM",
                    recipients: "soc-team@example.com",
                    format: "CSV",
                  },
                ].map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-md bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.frequency} | {report.format} format
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Recipients: {report.recipients}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="space-y-4">
                {[
                  {
                    id: "tmpl1",
                    name: "Executive Dashboard",
                    description: "High-level compliance overview for executives",
                    lastModified: "2023-04-15",
                  },
                  {
                    id: "tmpl2",
                    name: "Detailed Technical Audit",
                    description: "Technical details for security teams and auditors",
                    lastModified: "2023-04-10",
                  },
                  {
                    id: "tmpl3",
                    name: "Compliance Gap Analysis",
                    description: "Focused on non-compliant items with remediation steps",
                    lastModified: "2023-04-05",
                  },
                ].map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last modified: {template.lastModified}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Use Template</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
