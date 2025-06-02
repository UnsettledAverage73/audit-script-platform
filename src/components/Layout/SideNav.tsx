import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  ClipboardCheck,
  Clock,
  Download,
  FileText,
  Home,
  LayoutDashboard,
  Loader2,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  external?: boolean;
  children?: React.ReactNode;
}

const NavItem = ({
  href,
  icon,
  title,
  disabled,
  external,
  children,
}: NavItemProps) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-gray-200 hover:text-white"
      >
        <div className="mr-2 h-5 w-5">{icon}</div>
        <span>{title}</span>
        {children}
      </a>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-navy-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          disabled && "pointer-events-none opacity-60",
          isActive
            ? "bg-navy-700 text-white"
            : "text-gray-200 hover:text-white"
        )
      }
    >
      <div className="mr-2 h-5 w-5">{icon}</div>
      <span>{title}</span>
      {children}
    </NavLink>
  );
};

const SideNav = ({ className }: SideNavProps) => {
  const { hasPermission } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <div
      className={cn(
        "relative z-10 group flex flex-col bg-navy-900 text-white shadow-lg transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className={cn("p-4 flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            <span className="font-bold text-lg">Guardian</span>
          </div>
        )}
        {collapsed && <Shield className="w-6 h-6" />}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className={cn("text-gray-300 hover:text-white hover:bg-navy-700", 
            collapsed ? "absolute -right-3 top-6 w-6 h-6 rounded-full bg-navy-900" : ""
          )}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <h3 className={cn("mb-2 text-xs font-semibold text-gray-400", collapsed && "text-center")}>
            {!collapsed ? "NAVIGATION" : "•••"}
          </h3>
          <nav className="space-y-1">
            <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} title={collapsed ? "" : "Dashboard"} />
            <NavItem href="/audit" icon={<ShieldCheck className="h-5 w-5" />} title={collapsed ? "" : "Run Audit"} />
            <NavItem href="/systems" icon={<Server className="h-5 w-5" />} title={collapsed ? "" : "Systems"} />
            <NavItem href="/benchmarks" icon={<ClipboardCheck className="h-5 w-5" />} title={collapsed ? "" : "Benchmarks"} />
            <NavItem href="/reports" icon={<FileText className="h-5 w-5" />} title={collapsed ? "" : "Reports"} />
            <NavItem href="/history" icon={<Clock className="h-5 w-5" />} title={collapsed ? "" : "History"} />
          </nav>
        </div>

        {hasPermission("admin") && (
          <div className="px-3 py-2">
            <h3 className={cn("mb-2 text-xs font-semibold text-gray-400", collapsed && "text-center")}>
              {!collapsed ? "ADMINISTRATION" : "•••"}
            </h3>
            <nav className="space-y-1">
              <NavItem href="/users" icon={<Users className="h-5 w-5" />} title={collapsed ? "" : "Users"} />
              <NavItem href="/settings" icon={<Settings className="h-5 w-5" />} title={collapsed ? "" : "Settings"} />
            </nav>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SideNav;
