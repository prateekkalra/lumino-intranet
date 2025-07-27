"use client"
import { 
  Settings,
  Bell,
  Eye,
  Shield,
  Accessibility,
  Palette,
  Volume2,
  Mail,
  Type,
  Zap
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDialog } from "@/contexts/DialogContext"
import { usePreferencesStore } from "@/store/preferencesStore"
import { useToast } from "@/components/ui/use-toast"

export function SettingsDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { preferences, updateNotificationSettings, updateDisplaySettings, updatePrivacySettings, updateAccessibilitySettings, resetPreferences } = usePreferencesStore()
  const { toast } = useToast()

  const isOpen = isDialogOpen('settings')

  const handleResetSettings = () => {
    resetPreferences()
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('settings')}>
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings & Preferences
          </DialogTitle>
          <DialogDescription>
            Customize your workspace experience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] mt-6">
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show desktop notifications for important updates
                    </p>
                  </div>
                  <Switch
                    checked={preferences.notifications.showDesktopNotifications}
                    onCheckedChange={(checked) => 
                      updateNotificationSettings({ showDesktopNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Sound Effects
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound for notifications and interactions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.notifications.soundEnabled}
                    onCheckedChange={(checked) => 
                      updateNotificationSettings({ soundEnabled: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Digest
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email summaries of your activity
                  </p>
                  <RadioGroup
                    value={preferences.notifications.emailDigest}
                    onValueChange={(value: 'none' | 'daily' | 'weekly') => 
                      updateNotificationSettings({ emailDigest: value })
                    }
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="email-none" />
                      <Label htmlFor="email-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="email-daily" />
                      <Label htmlFor="email-daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="email-weekly" />
                      <Label htmlFor="email-weekly">Weekly</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use smaller spacing and condensed layouts
                    </p>
                  </div>
                  <Switch
                    checked={preferences.display.compactMode}
                    onCheckedChange={(checked) => 
                      updateDisplaySettings({ compactMode: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Animations
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.display.animationsEnabled}
                    onCheckedChange={(checked) => 
                      updateDisplaySettings({ animationsEnabled: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize motion effects for better accessibility
                    </p>
                  </div>
                  <Switch
                    checked={preferences.display.reducedMotion}
                    onCheckedChange={(checked) => 
                      updateDisplaySettings({ reducedMotion: checked })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Show Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others see when you're online and active
                    </p>
                  </div>
                  <Switch
                    checked={preferences.privacy.onlineStatus}
                    onCheckedChange={(checked) => 
                      updatePrivacySettings({ onlineStatus: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Activity Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your current activity and availability
                    </p>
                  </div>
                  <Switch
                    checked={preferences.privacy.activityStatus}
                    onCheckedChange={(checked) => 
                      updatePrivacySettings({ activityStatus: checked })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      High Contrast
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={preferences.accessibility.highContrast}
                    onCheckedChange={(checked) => 
                      updateAccessibilitySettings({ highContrast: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Large Text
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use larger font sizes throughout the interface
                    </p>
                  </div>
                  <Switch
                    checked={preferences.accessibility.largeText}
                    onCheckedChange={(checked) => 
                      updateAccessibilitySettings({ largeText: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Screen Reader Support</Label>  
                    <p className="text-sm text-muted-foreground">
                      Enhanced support for screen reading software
                    </p>
                  </div>
                  <Switch
                    checked={preferences.accessibility.screenReader}
                    onCheckedChange={(checked) => 
                      updateAccessibilitySettings({ screenReader: checked })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-secondary to-accent mx-auto">
                    <span className="text-2xl font-bold text-white">L</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Lumino Intranet</h3>
                    <p className="text-muted-foreground">Version 1.0.0</p>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your modern digital workspace for team collaboration, 
                    resource management, and organizational efficiency.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Drag-and-drop dashboard widgets</li>
                    <li>• Real-time notifications and updates</li>
                    <li>• Command palette for quick actions</li>
                    <li>• Resource booking system</li>
                    <li>• Employee directory and team management</li>
                    <li>• Integrated calendar and task management</li>
                    <li>• Analytics and reporting dashboard</li>
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-center">
                  <Button 
                    variant="destructive" 
                    onClick={handleResetSettings}
                    className="w-full max-w-xs"
                  >
                    Reset All Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}