
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, PlayCircle, Server, ShieldCheck } from "lucide-react";
import { cisBenchmarks, operatingSystems, targetSystems } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const Audit = () => {
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>([]);
  const [benchmarkId, setBenchmarkId] = useState<string>("");
  const [benchmarkLevel, setBenchmarkLevel] = useState<string>("1");
  const [isRunning, setIsRunning] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystemIds((prev) =>
      prev.includes(systemId)
        ? prev.filter((id) => id !== systemId)
        : [...prev, systemId]
    );
  };

  const handleBenchmarkChange = (value: string) => {
    setBenchmarkId(value);
  };

  const runAudit = () => {
    if (selectedSystemIds.length === 0) {
      toast({
        title: "No systems selected",
        description: "Please select at least one system to audit",
        variant: "destructive",
      });
      return;
    }

    if (!benchmarkId) {
      toast({
        title: "No benchmark selected",
        description: "Please select a benchmark to run",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setAuditLogs([]);

    // Mock the audit process with logs
    const selectedSystems = targetSystems.filter((sys) => 
      selectedSystemIds.includes(sys.id)
    );
    
    const benchmark = cisBenchmarks.find((benchmark) => benchmark.id === benchmarkId);
    
    if (!benchmark) {
      toast({
        title: "Benchmark not found",
        description: "The selected benchmark could not be found",
        variant: "destructive",
      });
      setIsRunning(false);
      return;
    }

    // Add initial logs
    addLog(`Starting audit of ${selectedSystems.length} system(s) using ${benchmark.name} v${benchmark.version}`);
    addLog(`Using compliance level ${benchmarkLevel}`);
    
    // Mock audit process with delayed logs
    const auditSystem = (index: number) => {
      if (index >= selectedSystems.length) {
        // Audit complete
        setTimeout(() => {
          addLog("All audits completed successfully!");
          setIsRunning(false);
          toast({
            title: "Audit Complete",
            description: `Successfully audited ${selectedSystems.length} system(s)`,
          });
        }, 1000);
        return;
      }

      const system = selectedSystems[index];
      
      // System connection logs
      setTimeout(() => {
        addLog(`[${system.name}] Establishing connection to ${system.hostname} (${system.ipAddress})`);
      }, 1000 * (index + 1));

      // System check logs
      setTimeout(() => {
        if (system.status === "offline") {
          addLog(`[${system.name}] ERROR: System is unreachable`);
          auditSystem(index + 1);
          return;
        }
        
        addLog(`[${system.name}] Connection established via ${system.connectionType}`);
      }, 2000 * (index + 1));

      // Running benchmark logs
      setTimeout(() => {
        addLog(`[${system.name}] Starting benchmark checks...`);
      }, 3000 * (index + 1));

      // Progress logs
      const totalSteps = 5;
      for (let step = 1; step <= totalSteps; step++) {
        setTimeout(() => {
          addLog(`[${system.name}] Running checks (${step}/${totalSteps}): ${getRandomBenchmarkCategory()}`);
        }, (3000 + step * 800) * (index + 1));
      }

      // Completion log
      setTimeout(() => {
        addLog(`[${system.name}] Benchmark completed - generating report...`);
        
        // Start next system
        auditSystem(index + 1);
      }, (3000 + totalSteps * 800 + 1500) * (index + 1));
    };

    // Start the mock audit process
    setTimeout(() => {
      auditSystem(0);
    }, 1000);
  };

  const addLog = (log: string) => {
    setAuditLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  const getRandomBenchmarkCategory = () => {
    const categories = [
      "Initial Setup",
      "Network Configuration",
      "Logging and Auditing",
      "System Access",
      "User Accounts",
      "File System Configuration",
      "Firewall Configuration",
      "System Services",
      "SSH Server Configuration",
      "PAM Configuration",
      "User and Group Settings",
      "Password Policies",
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const groupedSystems = targetSystems.reduce((acc, system) => {
    const osType = system.osName.toLowerCase().includes("windows") ? "windows" : "linux";
    if (!acc[osType]) {
      acc[osType] = [];
    }
    acc[osType].push(system);
    return acc;
  }, {} as Record<string, typeof targetSystems>);

  // Filter benchmarks based on selected systems
  const availableBenchmarks = cisBenchmarks.filter((benchmark) => {
    // If no systems selected, show all benchmarks
    if (selectedSystemIds.length === 0) return true;
    
    // Check if the benchmark is applicable to any of the selected systems
    return selectedSystemIds.some((systemId) => {
      const system = targetSystems.find((sys) => sys.id === systemId);
      return system && benchmark.osId === system.osId;
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Run Audit</h1>
        <Button 
          className="bg-navy-700 hover:bg-navy-900 flex items-center gap-2"
          onClick={runAudit}
          disabled={isRunning || selectedSystemIds.length === 0 || !benchmarkId}
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PlayCircle className="h-4 w-4" />
          )}
          {isRunning ? "Running..." : "Run Audit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Select Target Systems
            </CardTitle>
            <CardDescription>
              Choose the systems you want to audit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="linux">
              <TabsList className="mb-4">
                <TabsTrigger value="linux">Linux Systems</TabsTrigger>
                <TabsTrigger value="windows">Windows Systems</TabsTrigger>
              </TabsList>
              <TabsContent value="linux">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {groupedSystems['linux']?.map((system) => (
                      <div
                        key={system.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          selectedSystemIds.includes(system.id)
                            ? "border-navy-600 bg-navy-50/30 dark:bg-navy-900/30"
                            : "border-border hover:border-navy-300 dark:hover:border-navy-700"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={`system-${system.id}`}
                            checked={selectedSystemIds.includes(system.id)}
                            onCheckedChange={() => handleSystemSelect(system.id)}
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={`system-${system.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <div>
                                <p className="font-medium">{system.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {system.hostname} ({system.ipAddress})
                                </p>
                              </div>
                            </label>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              system.status === "online"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : system.status === "offline"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                            }`}>
                              {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {system.osName} {system.osVersion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="windows">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {groupedSystems['windows']?.map((system) => (
                      <div
                        key={system.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          selectedSystemIds.includes(system.id)
                            ? "border-navy-600 bg-navy-50/30 dark:bg-navy-900/30"
                            : "border-border hover:border-navy-300 dark:hover:border-navy-700"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={`system-${system.id}`}
                            checked={selectedSystemIds.includes(system.id)}
                            onCheckedChange={() => handleSystemSelect(system.id)}
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={`system-${system.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <div>
                                <p className="font-medium">{system.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {system.hostname} ({system.ipAddress})
                                </p>
                              </div>
                            </label>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              system.status === "online"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : system.status === "offline"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                            }`}>
                              {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {system.osName} {system.osVersion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {selectedSystemIds.length} system(s) selected
            </p>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Benchmark Options
            </CardTitle>
            <CardDescription>
              Select the benchmark and configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="benchmark">CIS Benchmark</Label>
              <Select value={benchmarkId} onValueChange={handleBenchmarkChange}>
                <SelectTrigger id="benchmark" className="w-full">
                  <SelectValue placeholder="Select a benchmark" />
                </SelectTrigger>
                <SelectContent>
                  {availableBenchmarks.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No benchmarks available for selected systems
                    </SelectItem>
                  ) : (
                    availableBenchmarks.map((benchmark) => (
                      <SelectItem key={benchmark.id} value={benchmark.id}>
                        {benchmark.name} (v{benchmark.version})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Compliance Level</Label>
              <RadioGroup
                value={benchmarkLevel}
                onValueChange={setBenchmarkLevel}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="1" id="level1" />
                  <Label htmlFor="level1" className="font-normal">
                    Level 1 (Standard)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="2" id="level2" />
                  <Label htmlFor="level2" className="font-normal">
                    Level 2 (High Security)
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-1">
                Level 1 is recommended for most environments. Level 2 is for environments requiring higher security.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Audit Name</Label>
              <Input id="name" placeholder="Enter a name for this audit (optional)" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>
            Real-time logs from the audit process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-[300px] overflow-y-auto">
            {auditLogs.length === 0 ? (
              <p>No logs available. Run an audit to see logs here.</p>
            ) : (
              auditLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
            {isRunning && (
              <div className="flex items-center mt-2">
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse-slow"></span>
                <span className="ml-1 animate-pulse-slow">_</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Audit;
