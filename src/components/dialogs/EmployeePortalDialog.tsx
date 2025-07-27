"use client"

import * as React from "react"
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Award, 
  FileText, 
  Shield,
  Target,
  CreditCard,
  Star,
  Download
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDialog } from "@/contexts/DialogContext"

interface EmployeeData {
  profile: {
    name: string
    employeeId: string
    department: string
    position: string
    manager: string
    startDate: string
    email: string
    phone: string
  }
  payroll: {
    salary: string
    nextPayDate: string
    ytdEarnings: string
    taxWithheld: string
    benefits: string
    lastPayStub: string
  }
  benefits: {
    healthInsurance: {
      plan: string
      coverage: string
      monthlyPremium: string
      deductible: string
    }
    retirement: {
      plan: string
      contribution: string
      employerMatch: string
      balance: string
    }
    pto: {
      available: number
      used: number
      total: number
      pending: number
    }
    wellness: {
      credits: number
      goal: number
      programs: string[]
    }
  }
  performance: {
    currentRating: string
    lastReview: string
    nextReview: string
    goals: Array<{
      title: string
      progress: number
      dueDate: string
      status: 'on-track' | 'at-risk' | 'completed'
    }>
    achievements: Array<{
      title: string
      date: string
      description: string
    }>
  }
}

const mockEmployeeData: EmployeeData = {
  profile: {
    name: "Alex Johnson",
    employeeId: "EMP-2024-001",
    department: "Engineering",
    position: "Senior Software Developer",
    manager: "Sarah Mitchell",
    startDate: "March 15, 2022",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567"
  },
  payroll: {
    salary: "$95,000",
    nextPayDate: "January 31, 2024",
    ytdEarnings: "$7,916.67",
    taxWithheld: "$1,583.33",
    benefits: "$245.00",
    lastPayStub: "December 31, 2023"
  },
  benefits: {
    healthInsurance: {
      plan: "Premium Health Plan",
      coverage: "Employee + Family",
      monthlyPremium: "$245.00",
      deductible: "$1,500"
    },
    retirement: {
      plan: "401(k) with Company Match",
      contribution: "8%",
      employerMatch: "4%",
      balance: "$45,780"
    },
    pto: {
      available: 18,
      used: 7,
      total: 25,
      pending: 2
    },
    wellness: {
      credits: 750,
      goal: 1000,
      programs: ["Gym Membership", "Mental Health Support", "Annual Health Screening"]
    }
  },
  performance: {
    currentRating: "Exceeds Expectations",
    lastReview: "June 15, 2023",
    nextReview: "June 15, 2024",
    goals: [
      {
        title: "Complete React Migration Project",
        progress: 85,
        dueDate: "March 31, 2024",
        status: "on-track"
      },
      {
        title: "Mentor 2 Junior Developers",
        progress: 60,
        dueDate: "December 31, 2024",
        status: "on-track"
      },
      {
        title: "Obtain AWS Certification",
        progress: 30,
        dueDate: "June 30, 2024",
        status: "at-risk"
      }
    ],
    achievements: [
      {
        title: "Employee of the Month",
        date: "November 2023",
        description: "Outstanding performance in Q3 product launch"
      },
      {
        title: "Innovation Award",
        date: "August 2023",
        description: "Developed automated testing framework saving 20 hours/week"
      },
      {
        title: "Team Leadership",
        date: "May 2023",
        description: "Successfully led cross-functional team of 8 developers"
      }
    ]
  }
}

export function EmployeePortalDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [data] = React.useState(mockEmployeeData)

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success-foreground border border-success/20'
      case 'on-track':
        return 'bg-info/10 text-info-foreground border border-info/20'
      case 'at-risk':
        return 'bg-destructive/10 text-destructive-foreground border border-destructive/20'
      default:
        return 'bg-muted/10 text-muted-foreground border border-muted/20'
    }
  }

  const ProgressBar = ({ progress, className = "" }: { progress: number; className?: string }) => (
    <div className={`w-full bg-muted rounded-full h-2 ${className}`}>
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )

  return (
    <Dialog 
      open={isDialogOpen('employee-portal')} 
      onOpenChange={(open) => !open && closeDialog('employee-portal')}
    >
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Card className="p-2">
                  <Users className="h-5 w-5 text-primary" />
                </Card>
                <div>
                  <DialogTitle className="text-xl">Employee Portal</DialogTitle>
                  <DialogDescription>
                    Access your benefits, payroll, performance metrics, and more
                  </DialogDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="px-6 pb-4 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Profile Summary */}
                <div className="xl:col-span-2 space-y-8">
                  <Card className="p-8">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Card className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                          {data.profile.name.split(' ').map(n => n[0]).join('')}
                        </Card>
                        <div>
                          <CardTitle className="text-xl">{data.profile.name}</CardTitle>
                          <CardDescription>{data.profile.position}</CardDescription>
                          <CardDescription className="text-sm">{data.profile.department}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <CardDescription>Employee ID:</CardDescription>
                          <CardDescription className="font-medium">{data.profile.employeeId}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Manager:</CardDescription>
                          <CardDescription className="font-medium">{data.profile.manager}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Start Date:</CardDescription>
                          <CardDescription className="font-medium">{data.profile.startDate}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Email:</CardDescription>
                          <CardDescription className="font-medium">{data.profile.email}</CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 text-center">
                      <CardContent>
                        <DollarSign className="h-8 w-8 text-success-foreground mx-auto mb-2" />
                        <CardTitle className="text-2xl">{data.payroll.salary}</CardTitle>
                        <CardDescription>Annual Salary</CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <CardContent>
                        <Calendar className="h-8 w-8 text-info-foreground mx-auto mb-2" />
                        <CardTitle className="text-2xl">{data.benefits.pto.available}</CardTitle>
                        <CardDescription>PTO Days Left</CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <CardContent>
                        <TrendingUp className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                        <CardTitle className="text-2xl">{data.benefits.retirement.balance}</CardTitle>
                        <CardDescription>401(k) Balance</CardDescription>
                      </CardContent>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <CardContent>
                        <Award className="h-8 w-8 text-warning-foreground mx-auto mb-2" />
                        <CardTitle className="text-2xl">{data.performance.achievements.length}</CardTitle>
                        <CardDescription>Achievements</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Request Time Off
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download Pay Stub
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Update Benefits
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Target className="h-4 w-4 mr-2" />
                          View Goals
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Wellness Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <CardDescription>Annual Credits</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.wellness.credits}/{data.benefits.wellness.goal}</CardDescription>
                        </div>
                        <ProgressBar progress={(data.benefits.wellness.credits / data.benefits.wellness.goal) * 100} />
                        <CardDescription className="text-xs">
                          {data.benefits.wellness.goal - data.benefits.wellness.credits} credits needed for full bonus
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payroll" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Current Pay Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <CardDescription>Gross Pay</CardDescription>
                        <CardDescription className="font-medium">{data.payroll.ytdEarnings}</CardDescription>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <CardDescription>Tax Withheld</CardDescription>
                        <CardDescription className="font-medium text-destructive">-{data.payroll.taxWithheld}</CardDescription>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <CardDescription>Benefits</CardDescription>
                        <CardDescription className="font-medium text-destructive">-{data.payroll.benefits}</CardDescription>
                      </div>
                      <div className="flex items-center justify-between py-2 text-lg font-semibold">
                        <CardTitle>Net Pay</CardTitle>
                        <CardTitle className="text-success-foreground">$6,088.34</CardTitle>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <CardDescription>Next Pay Date</CardDescription>
                      <CardDescription className="font-medium">{data.payroll.nextPayDate}</CardDescription>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Year-to-Date Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <CardDescription>Total Earnings</CardDescription>
                        <CardTitle className="text-2xl text-success-foreground">{data.payroll.ytdEarnings}</CardTitle>
                      </div>
                      <div>
                        <CardDescription>Total Tax Withheld</CardDescription>
                        <CardTitle className="text-xl text-destructive">{data.payroll.taxWithheld}</CardTitle>
                      </div>
                      <div>
                        <CardDescription>Total Benefits</CardDescription>
                        <CardTitle className="text-xl text-info-foreground">{data.payroll.benefits}</CardTitle>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Tax Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="space-y-10">
                {/* Health Insurance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Health Insurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <div>
                          <CardDescription>Plan</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.healthInsurance.plan}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Coverage</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.healthInsurance.coverage}</CardDescription>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <CardDescription>Monthly Premium</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.healthInsurance.monthlyPremium}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Deductible</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.healthInsurance.deductible}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Retirement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Retirement Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <div>
                          <CardDescription>Plan Type</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.retirement.plan}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Your Contribution</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.retirement.contribution}</CardDescription>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <CardDescription>Employer Match</CardDescription>
                          <CardDescription className="font-medium">{data.benefits.retirement.employerMatch}</CardDescription>
                        </div>
                        <div>
                          <CardDescription>Current Balance</CardDescription>
                          <CardTitle className="text-xl text-success-foreground">{data.benefits.retirement.balance}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PTO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Paid Time Off
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <CardTitle className="text-2xl text-success-foreground">{data.benefits.pto.available}</CardTitle>
                        <CardDescription>Available</CardDescription>
                      </div>
                      <div className="text-center">
                        <CardTitle className="text-2xl text-destructive">{data.benefits.pto.used}</CardTitle>
                        <CardDescription>Used</CardDescription>
                      </div>
                      <div className="text-center">
                        <CardTitle className="text-2xl text-warning-foreground">{data.benefits.pto.pending}</CardTitle>
                        <CardDescription>Pending</CardDescription>
                      </div>
                      <div className="text-center">
                        <CardTitle className="text-2xl">{data.benefits.pto.total}</CardTitle>
                        <CardDescription>Total Annual</CardDescription>
                      </div>
                    </div>
                    <ProgressBar progress={(data.benefits.pto.used / data.benefits.pto.total) * 100} />
                    <div className="mt-4">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Request Time Off
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="flex-1 overflow-auto m-0 px-6 pb-6">
              <div className="space-y-6">
                {/* Performance Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <CardDescription>Current Rating</CardDescription>
                        <CardTitle className="text-xl text-success-foreground">{data.performance.currentRating}</CardTitle>
                      </div>
                      <div>
                        <CardDescription>Last Review</CardDescription>
                        <CardDescription className="font-medium">{data.performance.lastReview}</CardDescription>
                      </div>
                      <div>
                        <CardDescription>Next Review</CardDescription>
                        <CardDescription className="font-medium">{data.performance.nextReview}</CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.performance.goals.map((goal, index) => (
                        <Card key={index} className="p-4">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{goal.title}</CardTitle>
                              <Badge className={getGoalStatusColor(goal.status)}>
                                {goal.status.replace('-', ' ')}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                              <CardDescription>Due: {goal.dueDate}</CardDescription>
                              <CardDescription className="font-medium">{goal.progress}%</CardDescription>
                            </div>
                            <ProgressBar progress={goal.progress} />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.performance.achievements.map((achievement, index) => (
                        <Card key={index} className="flex items-start gap-4 p-4">
                          <Card className="p-2 rounded-full bg-warning/10">
                            <Award className="h-5 w-5 text-warning-foreground" />
                          </Card>
                          <div className="flex-1">
                            <CardTitle className="text-base">{achievement.title}</CardTitle>
                            <CardDescription className="mb-1">{achievement.description}</CardDescription>
                            <CardDescription className="text-xs">{achievement.date}</CardDescription>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="flex-1 overflow-auto m-0 px-6 pb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Important Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Employee Handbook", type: "PDF", size: "2.4 MB", date: "Updated Jan 2024" },
                      { name: "Benefits Summary", type: "PDF", size: "1.1 MB", date: "Updated Dec 2023" },
                      { name: "W-2 Form 2023", type: "PDF", size: "245 KB", date: "Generated Jan 2024" },
                      { name: "Performance Review", type: "PDF", size: "892 KB", date: "June 2023" },
                      { name: "Emergency Contacts", type: "PDF", size: "156 KB", date: "Updated Nov 2023" },
                      { name: "Direct Deposit Form", type: "PDF", size: "203 KB", date: "March 2022" }
                    ].map((doc, index) => (
                      <Card key={index} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Card className="p-2">
                            <FileText className="h-8 w-8 text-info-foreground" />
                          </Card>
                          <div>
                            <CardTitle className="text-base">{doc.name}</CardTitle>
                            <CardDescription>{doc.size} • {doc.date}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 pt-4 border-t">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Employee Portal • Last updated: January 15, 2024
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => closeDialog('employee-portal')}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}