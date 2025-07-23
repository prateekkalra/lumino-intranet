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
import { Card } from "@/components/ui/card"
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
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'on-track':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'at-risk':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const ProgressBar = ({ progress, className = "" }: { progress: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 ${className}`}>
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
      <DialogContent className="max-w-6xl max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Employee Portal</DialogTitle>
              <DialogDescription>
                Access your benefits, payroll, performance metrics, and more
              </DialogDescription>
            </div>
          </div>
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
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {data.profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{data.profile.name}</h3>
                        <p className="text-muted-foreground">{data.profile.position}</p>
                        <p className="text-sm text-muted-foreground">{data.profile.department}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Employee ID:</span>
                        <span className="ml-2 font-medium">{data.profile.employeeId}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Manager:</span>
                        <span className="ml-2 font-medium">{data.profile.manager}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <span className="ml-2 font-medium">{data.profile.startDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2 font-medium">{data.profile.email}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.payroll.salary}</p>
                      <p className="text-sm text-muted-foreground">Annual Salary</p>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.benefits.pto.available}</p>
                      <p className="text-sm text-muted-foreground">PTO Days Left</p>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.benefits.retirement.balance}</p>
                      <p className="text-sm text-muted-foreground">401(k) Balance</p>
                    </Card>
                    
                    <Card className="p-6 text-center">
                      <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.performance.achievements.length}</p>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                    </Card>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-8">
                  <Card className="p-8">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
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
                  </Card>

                  <Card className="p-8">
                    <h3 className="font-semibold mb-4">Wellness Progress</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Annual Credits</span>
                        <span className="font-medium">{data.benefits.wellness.credits}/{data.benefits.wellness.goal}</span>
                      </div>
                      <ProgressBar progress={(data.benefits.wellness.credits / data.benefits.wellness.goal) * 100} />
                      <div className="text-xs text-muted-foreground">
                        {data.benefits.wellness.goal - data.benefits.wellness.credits} credits needed for full bonus
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payroll" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Current Pay Period
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Gross Pay</span>
                      <span className="font-medium">{data.payroll.ytdEarnings}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Tax Withheld</span>
                      <span className="font-medium text-red-600">-{data.payroll.taxWithheld}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Benefits</span>
                      <span className="font-medium text-red-600">-{data.payroll.benefits}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 text-lg font-semibold">
                      <span>Net Pay</span>
                      <span className="text-green-600">$6,088.34</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Next Pay Date</p>
                    <p className="font-medium">{data.payroll.nextPayDate}</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Year-to-Date Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold text-green-600">{data.payroll.ytdEarnings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tax Withheld</p>
                      <p className="text-xl font-semibold text-red-600">{data.payroll.taxWithheld}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Benefits</p>
                      <p className="text-xl font-semibold text-blue-600">{data.payroll.benefits}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tax Documents
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="space-y-10">
                {/* Health Insurance */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Health Insurance
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Plan</p>
                        <p className="font-medium">{data.benefits.healthInsurance.plan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage</p>
                        <p className="font-medium">{data.benefits.healthInsurance.coverage}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Premium</p>
                        <p className="font-medium">{data.benefits.healthInsurance.monthlyPremium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Deductible</p>
                        <p className="font-medium">{data.benefits.healthInsurance.deductible}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Retirement */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Retirement Plan
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Plan Type</p>
                        <p className="font-medium">{data.benefits.retirement.plan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Your Contribution</p>
                        <p className="font-medium">{data.benefits.retirement.contribution}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Employer Match</p>
                        <p className="font-medium">{data.benefits.retirement.employerMatch}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-xl font-bold text-green-600">{data.benefits.retirement.balance}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* PTO */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Paid Time Off
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{data.benefits.pto.available}</p>
                      <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{data.benefits.pto.used}</p>
                      <p className="text-sm text-muted-foreground">Used</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{data.benefits.pto.pending}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{data.benefits.pto.total}</p>
                      <p className="text-sm text-muted-foreground">Total Annual</p>
                    </div>
                  </div>
                  <ProgressBar progress={(data.benefits.pto.used / data.benefits.pto.total) * 100} />
                  <div className="mt-4">
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Request Time Off
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="flex-1 overflow-auto m-0 px-6 pb-6">
              <div className="space-y-6">
                {/* Performance Summary */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Performance Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Rating</p>
                      <p className="text-xl font-bold text-green-600">{data.performance.currentRating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Review</p>
                      <p className="font-medium">{data.performance.lastReview}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <p className="font-medium">{data.performance.nextReview}</p>
                    </div>
                  </div>
                </Card>

                {/* Goals */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Current Goals</h3>
                  <div className="space-y-4">
                    {data.performance.goals.map((goal, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge className={getGoalStatusColor(goal.status)}>
                            {goal.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Due: {goal.dueDate}</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        <ProgressBar progress={goal.progress} />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Achievements */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
                  <div className="space-y-4">
                    {data.performance.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                          <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="flex-1 overflow-auto m-0 px-6 pb-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Important Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Employee Handbook", type: "PDF", size: "2.4 MB", date: "Updated Jan 2024" },
                    { name: "Benefits Summary", type: "PDF", size: "1.1 MB", date: "Updated Dec 2023" },
                    { name: "W-2 Form 2023", type: "PDF", size: "245 KB", date: "Generated Jan 2024" },
                    { name: "Performance Review", type: "PDF", size: "892 KB", date: "June 2023" },
                    { name: "Emergency Contacts", type: "PDF", size: "156 KB", date: "Updated Nov 2023" },
                    { name: "Direct Deposit Form", type: "PDF", size: "203 KB", date: "March 2022" }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Employee Portal • Last updated: January 15, 2024
            </div>
            <Button variant="outline" onClick={() => closeDialog('employee-portal')}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}