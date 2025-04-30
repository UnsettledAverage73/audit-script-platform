
// Common types used throughout the application

export type UserRole = "admin" | "auditor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type OperatingSystemType = "windows" | "linux";

export interface OperatingSystem {
  id: string;
  name: string;
  version: string;
  type: OperatingSystemType;
  icon: string;
}

export type BenchmarkLevel = 1 | 2;

export interface CISBenchmark {
  id: string;
  name: string;
  version: string;
  osId: string;
  levels: BenchmarkLevel[];
}

export type ComplianceStatus = "pass" | "fail" | "warn" | "error" | "notApplicable";

export interface ComplianceResult {
  id: string;
  benchmarkId: string;
  ruleId: string;
  status: ComplianceStatus;
  score: number;
  details: string;
  remediation?: string;
}

export interface AuditResult {
  id: string;
  name: string;
  systemId: string;
  systemName: string;
  osInfo: {
    id: string;
    name: string;
    version: string;
  };
  benchmarkInfo: {
    id: string;
    name: string;
    version: string;
  };
  timestamp: string;
  status: "completed" | "failed" | "in-progress";
  complianceScore: number;
  passedRules: number;
  failedRules: number;
  totalRules: number;
  results: ComplianceResult[];
}

export interface TargetSystem {
  id: string;
  name: string;
  hostname: string;
  osId: string;
  osName: string;
  osVersion: string;
  ipAddress: string;
  connectionType: "ssh" | "winrm";
  lastScan?: string;
  status: "online" | "offline" | "unknown";
}
