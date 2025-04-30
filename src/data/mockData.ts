
import { AuditResult, CISBenchmark, ComplianceStatus, OperatingSystem, TargetSystem, User } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@auditguardian.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    id: "2",
    name: "Auditor User",
    email: "auditor@auditguardian.com",
    role: "auditor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=auditor",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@auditguardian.com",
    role: "viewer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=viewer",
  },
];

// Mock operating systems
export const operatingSystems: OperatingSystem[] = [
  {
    id: "rhel8",
    name: "RHEL",
    version: "8",
    type: "linux",
    icon: "redhat",
  },
  {
    id: "rhel9",
    name: "RHEL",
    version: "9",
    type: "linux",
    icon: "redhat",
  },
  {
    id: "ubuntu2004",
    name: "Ubuntu",
    version: "20.04",
    type: "linux",
    icon: "ubuntu",
  },
  {
    id: "ubuntu2204",
    name: "Ubuntu",
    version: "22.04",
    type: "linux",
    icon: "ubuntu",
  },
  {
    id: "ubuntuserver1004",
    name: "Ubuntu Server",
    version: "10.04",
    type: "linux",
    icon: "ubuntu",
  },
  {
    id: "ubuntuserver1204",
    name: "Ubuntu Server",
    version: "12.04",
    type: "linux",
    icon: "ubuntu",
  },
  {
    id: "win10",
    name: "Windows",
    version: "10 Standalone",
    type: "windows",
    icon: "windows",
  },
  {
    id: "win11",
    name: "Windows",
    version: "11 Enterprise",
    type: "windows",
    icon: "windows",
  },
];

// Mock CIS benchmarks
export const cisBenchmarks: CISBenchmark[] = [
  {
    id: "cis_rhel8_1.0",
    name: "CIS RedHat Enterprise Linux 8 Benchmark",
    version: "1.0.0",
    osId: "rhel8",
    levels: [1, 2],
  },
  {
    id: "cis_rhel9_1.0",
    name: "CIS RedHat Enterprise Linux 9 Benchmark",
    version: "1.0.0",
    osId: "rhel9",
    levels: [1, 2],
  },
  {
    id: "cis_ubuntu2004_1.0",
    name: "CIS Ubuntu 20.04 Benchmark",
    version: "1.1.0",
    osId: "ubuntu2004",
    levels: [1, 2],
  },
  {
    id: "cis_ubuntu2204_1.0",
    name: "CIS Ubuntu 22.04 Benchmark",
    version: "1.0.0",
    osId: "ubuntu2204",
    levels: [1, 2],
  },
  {
    id: "cis_win10_1.0",
    name: "CIS Microsoft Windows 10 Benchmark",
    version: "1.12.0",
    osId: "win10",
    levels: [1, 2],
  },
  {
    id: "cis_win11_1.0",
    name: "CIS Microsoft Windows 11 Enterprise Benchmark",
    version: "1.0.0",
    osId: "win11",
    levels: [1, 2],
  },
];

// Mock target systems
export const targetSystems: TargetSystem[] = [
  {
    id: "sys1",
    name: "Production RHEL8 Server",
    hostname: "prod-rhel8-01.example.com",
    osId: "rhel8",
    osName: "RHEL",
    osVersion: "8",
    ipAddress: "10.0.1.15",
    connectionType: "ssh",
    lastScan: "2023-04-28T14:30:00Z",
    status: "online",
  },
  {
    id: "sys2",
    name: "Dev Ubuntu Server",
    hostname: "dev-ubuntu-01.example.com",
    osId: "ubuntu2004",
    osName: "Ubuntu",
    osVersion: "20.04",
    ipAddress: "10.0.1.25",
    connectionType: "ssh",
    lastScan: "2023-04-27T09:15:00Z",
    status: "online",
  },
  {
    id: "sys3",
    name: "Win10 Workstation",
    hostname: "workstation-w10-15.example.com",
    osId: "win10",
    osName: "Windows",
    osVersion: "10 Standalone",
    ipAddress: "10.0.2.34",
    connectionType: "winrm",
    lastScan: "2023-04-26T11:45:00Z",
    status: "offline",
  },
  {
    id: "sys4",
    name: "RHEL9 Test Server",
    hostname: "test-rhel9-01.example.com",
    osId: "rhel9",
    osName: "RHEL",
    osVersion: "9",
    ipAddress: "10.0.3.12",
    connectionType: "ssh",
    status: "unknown",
  },
  {
    id: "sys5",
    name: "Win11 Enterprise Desktop",
    hostname: "desktop-w11e-04.example.com",
    osId: "win11",
    osName: "Windows",
    osVersion: "11 Enterprise",
    ipAddress: "10.0.2.45",
    connectionType: "winrm",
    lastScan: "2023-04-25T16:20:00Z",
    status: "online",
  },
];

// Helper function to generate random compliance results
const generateRandomComplianceResults = (count: number, benchmarkId: string) => {
  const statuses: ComplianceStatus[] = ["pass", "fail", "warn", "error", "notApplicable"];
  const results = [];
  
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * 3)]; // Mostly pass, fail, warn
    results.push({
      id: `${benchmarkId}_rule_${i}`,
      benchmarkId,
      ruleId: `${i}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      status,
      score: status === "pass" ? 100 : status === "warn" ? 50 : 0,
      details: `Rule ${i} details - ${status === "pass" ? "Compliant" : status === "warn" ? "Needs review" : "Not compliant"}`,
      remediation: status !== "pass" ? "Update configuration settings according to CIS guidelines." : undefined,
    });
  }
  
  return results;
};

// Mock audit results
export const auditResults: AuditResult[] = [
  {
    id: "audit1",
    name: "Weekly RHEL8 Audit",
    systemId: "sys1",
    systemName: "Production RHEL8 Server",
    osInfo: {
      id: "rhel8",
      name: "RHEL",
      version: "8",
    },
    benchmarkInfo: {
      id: "cis_rhel8_1.0",
      name: "CIS RedHat Enterprise Linux 8 Benchmark",
      version: "1.0.0",
    },
    timestamp: "2023-04-28T14:30:00Z",
    status: "completed",
    complianceScore: 87,
    passedRules: 174,
    failedRules: 26,
    totalRules: 200,
    results: generateRandomComplianceResults(200, "cis_rhel8_1.0"),
  },
  {
    id: "audit2",
    name: "Ubuntu Server Audit",
    systemId: "sys2",
    systemName: "Dev Ubuntu Server",
    osInfo: {
      id: "ubuntu2004",
      name: "Ubuntu",
      version: "20.04",
    },
    benchmarkInfo: {
      id: "cis_ubuntu2004_1.0",
      name: "CIS Ubuntu 20.04 Benchmark",
      version: "1.1.0",
    },
    timestamp: "2023-04-27T09:15:00Z",
    status: "completed",
    complianceScore: 92,
    passedRules: 184,
    failedRules: 16,
    totalRules: 200,
    results: generateRandomComplianceResults(200, "cis_ubuntu2004_1.0"),
  },
  {
    id: "audit3",
    name: "Windows 10 Workstation Audit",
    systemId: "sys3",
    systemName: "Win10 Workstation",
    osInfo: {
      id: "win10",
      name: "Windows",
      version: "10 Standalone",
    },
    benchmarkInfo: {
      id: "cis_win10_1.0",
      name: "CIS Microsoft Windows 10 Benchmark",
      version: "1.12.0",
    },
    timestamp: "2023-04-26T11:45:00Z",
    status: "failed",
    complianceScore: 0,
    passedRules: 0,
    failedRules: 0,
    totalRules: 180,
    results: [],
  },
  {
    id: "audit4",
    name: "Windows 11 Enterprise Audit",
    systemId: "sys5",
    systemName: "Win11 Enterprise Desktop",
    osInfo: {
      id: "win11",
      name: "Windows",
      version: "11 Enterprise",
    },
    benchmarkInfo: {
      id: "cis_win11_1.0",
      name: "CIS Microsoft Windows 11 Enterprise Benchmark",
      version: "1.0.0",
    },
    timestamp: "2023-04-25T16:20:00Z",
    status: "completed",
    complianceScore: 78,
    passedRules: 140,
    failedRules: 40,
    totalRules: 180,
    results: generateRandomComplianceResults(180, "cis_win11_1.0"),
  },
  {
    id: "audit5",
    name: "RHEL9 Initial Scan",
    systemId: "sys4",
    systemName: "RHEL9 Test Server",
    osInfo: {
      id: "rhel9",
      name: "RHEL",
      version: "9",
    },
    benchmarkInfo: {
      id: "cis_rhel9_1.0",
      name: "CIS RedHat Enterprise Linux 9 Benchmark",
      version: "1.0.0",
    },
    timestamp: "2023-04-24T10:05:00Z",
    status: "in-progress",
    complianceScore: 0,
    passedRules: 0,
    failedRules: 0,
    totalRules: 210,
    results: [],
  },
];

// Mock authentication state
export const mockAuthState = {
  isAuthenticated: true,
  currentUser: mockUsers[0], // Admin by default
};
