
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const TopNav = () => {
  const { user, logout } = useAuth();
  const [notificationCount] = useState(3);

  return (
    <header className="bg-white dark:bg-navy-800 shadow z-10 py-2 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-medium">Audit Guardian Platform</h1>
        <Badge 
          variant="outline" 
          className="ml-3 bg-navy-100/10 text-navy-600 border-navy-200 dark:bg-navy-700/20 dark:text-navy-300 dark:border-navy-600"
        >
          Beta
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-alert-500 text-white flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-navy-900">Audit failed on RHEL8 Server</span>
                  <span className="text-sm text-muted-foreground">Authentication error when connecting to server</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-navy-900">Critical finding on Ubuntu Server</span>
                  <span className="text-sm text-muted-foreground">SSH root login enabled on production server</span>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-navy-900">Windows servers pending updates</span>
                  <span className="text-sm text-muted-foreground">5 systems require security updates</span>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium text-navy-600">
              <Link to="/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white z-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNav;
