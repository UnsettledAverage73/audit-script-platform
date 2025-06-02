
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  Server,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { targetSystems } from "@/data/mockData";

const Systems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "unknown":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      online: "bg-green-100 text-green-800 border-green-200",
      offline: "bg-red-100 text-red-800 border-red-200",
      unknown: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return (
      <Badge 
        variant="outline" 
        className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}
      >
        <div className="flex items-center gap-1">
          {getStatusIcon(status)}
          {status}
        </div>
      </Badge>
    );
  };

  const getLastAuditStatus = (systemId: string) => {
    // Mock audit status based on system ID
    const auditStatuses = {
      sys1: { status: "passed", score: 87 },
      sys2: { status: "passed", score: 92 },
      sys3: { status: "failed", score: 0 },
      sys4: { status: "pending", score: 0 },
      sys5: { status: "warning", score: 78 },
    };

    return auditStatuses[systemId as keyof typeof auditStatuses] || { status: "never", score: 0 };
  };

  const getAuditStatusBadge = (auditStatus: { status: string; score: number }) => {
    const variants = {
      passed: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pending: "bg-blue-100 text-blue-800 border-blue-200",
      never: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge 
        variant="outline"
        className={variants[auditStatus.status as keyof typeof variants]}
      >
        {auditStatus.status === "passed" || auditStatus.status === "warning" 
          ? `${auditStatus.status} (${auditStatus.score}%)`
          : auditStatus.status
        }
      </Badge>
    );
  };

  const filteredSystems = targetSystems.filter((system) => {
    const matchesSearch = 
      system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.ipAddress.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || system.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Systems</h1>
          <p className="text-muted-foreground">
            Manage and monitor your target systems for CIS compliance auditing.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add System
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Target Systems
          </CardTitle>
          <CardDescription>
            View and manage all systems configured for auditing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Operating System</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSystems.map((system) => {
                  const auditStatus = getLastAuditStatus(system.id);
                  return (
                    <TableRow key={system.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{system.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {system.hostname}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {system.ipAddress}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {system.osName} {system.osVersion}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {system.connectionType}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(system.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getAuditStatusBadge(auditStatus)}
                          {system.lastScan && (
                            <div className="text-xs text-muted-foreground">
                              {new Date(system.lastScan).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Audit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredSystems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Server className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No systems found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Systems;
