"use client"

import * as React from "react"
import { 
  User, 
  Building, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Shield,
  Key,
  Globe,
  Settings,
  CheckCircle,
  Upload,
  Bell
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge as BadgeComponent } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  role: string
  manager: string
  location: string
  bio: string
  skills: string[]
  avatar: string
  status: 'online' | 'away' | 'busy' | 'offline'
  timezone: string
  startDate: string
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
    mentions: boolean
  }
  privacy: {
    showEmail: boolean
    showPhone: boolean
    showStatus: boolean
  }
  twoFactorEnabled: boolean
}

const mockProfile: UserProfile = {
  id: "1",
  firstName: "John",
  lastName: "Doe", 
  email: "john.doe@lumino.com",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  role: "Senior Frontend Developer",
  manager: "Sarah Johnson",
  location: "San Francisco, CA",
  bio: "Passionate frontend developer with 5+ years of experience building modern web applications. Love working with React, TypeScript, and creating beautiful user experiences.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format",
  status: "online",
  timezone: "PST (UTC-8)",
  startDate: "March 15, 2021",
  notifications: {
    email: true,
    push: true,
    desktop: false,
    mentions: true
  },
  privacy: {
    showEmail: true,
    showPhone: false,
    showStatus: true
  },
  twoFactorEnabled: true
}

export function ProfileDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [profile, setProfile] = React.useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedProfile, setEditedProfile] = React.useState<UserProfile>(mockProfile)

  const isOpen = isDialogOpen('profile')

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleSkillAdd = (skill: string) => {
    if (skill && !editedProfile.skills.includes(skill)) {
      setEditedProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const handleSkillRemove = (skillToRemove: string) => {
    setEditedProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('profile')}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            My Profile
          </DialogTitle>
          <DialogDescription>
            Manage your profile information, preferences, and account settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] mt-4">
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Profile Picture
                    </span>
                    {!isEditing && (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit Profile
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profile.avatar} alt="Profile picture" />
                        <AvatarFallback className="bg-gradient-to-br from-primary via-blue-600 to-orange-600 text-white text-lg">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(profile.status)} border-2 border-background rounded-full`} />
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Change Picture
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={isEditing ? editedProfile.firstName : profile.firstName}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={isEditing ? editedProfile.lastName : profile.lastName}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email address cannot be changed. Contact IT support if needed.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={isEditing ? editedProfile.location : profile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={isEditing ? editedProfile.status : profile.status}
                      onValueChange={(value: any) => setEditedProfile(prev => ({ ...prev, status: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">🟢 Online</SelectItem>
                        <SelectItem value="away">🟡 Away</SelectItem>
                        <SelectItem value="busy">🔴 Busy</SelectItem>
                        <SelectItem value="offline">⚫ Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-1" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Work Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value={profile.department} disabled className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={profile.role} disabled className="bg-muted" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Manager</Label>
                      <Input value={profile.manager} disabled className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input value={profile.startDate} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Input value={profile.timezone} disabled className="bg-muted" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">Work information is managed by HR. Contact them for changes.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={isEditing ? editedProfile.bio : profile.bio}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills & Expertise</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(isEditing ? editedProfile.skills : profile.skills).map((skill) => (
                        <BadgeComponent key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleSkillRemove(skill)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </BadgeComponent>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSkillAdd(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            handleSkillAdd(input.value)
                            input.value = ''
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={profile.notifications.email}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: checked }
                      }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on mobile</p>
                    </div>
                    <Switch 
                      checked={profile.notifications.push}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked }
                      }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                    </div>
                    <Switch 
                      checked={profile.notifications.desktop}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, desktop: checked }
                      }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mention Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when mentioned</p>
                    </div>
                    <Switch 
                      checked={profile.notifications.mentions}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, mentions: checked }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">Make your email visible to other users</p>
                    </div>
                    <Switch 
                      checked={profile.privacy.showEmail}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showEmail: checked }
                      }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Phone Number</Label>
                      <p className="text-sm text-muted-foreground">Make your phone number visible to other users</p>
                    </div>
                    <Switch 
                      checked={profile.privacy.showPhone}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showPhone: checked }
                      }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Switch 
                      checked={profile.privacy.showStatus}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showStatus: checked }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <Label className="font-medium">Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeComponent variant={profile.twoFactorEnabled ? "default" : "secondary"}>
                        {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </BadgeComponent>
                      <Button variant="outline" size="sm">
                        {profile.twoFactorEnabled ? "Manage" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Change Password</Label>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button className="w-full">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}