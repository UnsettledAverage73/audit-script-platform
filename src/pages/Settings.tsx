
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Key, Mail, Save, Settings2, Shield, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [sshKey, setSshKey] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveSettings = (section: string) => {
    setSaveLoading(true);
    
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: `Your ${section} settings have been saved successfully.`,
      });
      setSaveLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your account settings and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@auditguardian.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Audit Guardian, Inc." />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="bio">About</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself"
                    defaultValue="Security administrator responsible for managing CIS compliance across the organization."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("profile")}
                  disabled={saveLoading}
                  className="bg-navy-700 hover:bg-navy-900"
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Separator className="my-2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Enable two-factor authentication for enhanced security</p>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional verification step.
                      </p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Auto-logout after inactivity</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out when inactive for a period of time
                      </p>
                    </div>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("security")}
                  disabled={saveLoading}
                  className="bg-navy-700 hover:bg-navy-900"
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" />
                  Connection Settings
                </CardTitle>
                <CardDescription>
                  Configure SSH keys and credentials for remote systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SSH Authentication</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Use SSH Keys</p>
                        <p className="text-sm text-muted-foreground">
                          Connect to Linux systems using SSH key authentication
                        </p>
                      </div>
                      <Switch id="use-ssh-keys" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ssh-key">SSH Private Key</Label>
                      <Textarea
                        id="ssh-key"
                        value={sshKey}
                        onChange={(e) => setSshKey(e.target.value)}
                        placeholder="Paste your private key here..."
                        rows={5}
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your private key is securely stored and never shared with third parties.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ssh-username">Default SSH Username</Label>
                      <Input id="ssh-username" defaultValue="audit-user" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Windows Authentication</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="winrm-username">WinRM Username</Label>
                      <Input id="winrm-username" defaultValue="audit-admin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="winrm-password">WinRM Password</Label>
                      <Input id="winrm-password" type="password" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Use SSL/TLS for WinRM</p>
                        <p className="text-sm text-muted-foreground">
                          Secure Windows Remote Management connections using SSL/TLS
                        </p>
                      </div>
                      <Switch id="winrm-ssl" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Tokens</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>API Access</p>
                      <p className="text-sm text-muted-foreground">
                        Enable API access for automation and integrations
                      </p>
                    </div>
                    <Switch id="api-access" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Production API Token</p>
                        <p className="text-sm text-muted-foreground">Created on Apr 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Key className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("connections")}
                  disabled={saveLoading}
                  className="bg-navy-700 hover:bg-navy-900"
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Audit Completion</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails when audits are completed
                        </p>
                      </div>
                      <Switch id="email-audit-completion" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Critical Findings</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for critical security findings
                        </p>
                      </div>
                      <Switch id="email-critical-findings" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>System Status Changes</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails when system status changes (online/offline)
                        </p>
                      </div>
                      <Switch id="email-system-status" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly summary reports of all audit activities
                        </p>
                      </div>
                      <Switch id="email-weekly-reports" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Slack Integration</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p>Enable Slack Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications to a Slack channel
                        </p>
                      </div>
                      <Switch id="slack-enable" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                      <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slack-channel">Default Channel</Label>
                      <Input id="slack-channel" placeholder="#security-alerts" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Frequency</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification-frequency">Alert Batching</Label>
                    <select
                      id="notification-frequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="immediate">Send Immediately</option>
                      <option value="hourly">Batch Hourly</option>
                      <option value="daily">Daily Digest</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose how frequently you want to receive notifications
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("notifications")}
                  disabled={saveLoading}
                  className="bg-navy-700 hover:bg-navy-900"
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
