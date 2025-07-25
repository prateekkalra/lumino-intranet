"use client"

import * as React from "react"
import { 
  MapPin,
  Clock,
  Users,
  Calendar,
  Search,
  Check,
  X,
  Monitor,
  Video,
  Wifi,
  Coffee,
  Car,
  Laptop,
  Printer,
  Headphones
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Resource {
  id: string
  name: string
  type: 'room' | 'equipment'
  capacity?: number
  location: string
  amenities: string[]
  description: string
  image?: string
  isAvailable: boolean
  nextAvailable?: string
}


const mockRooms: Resource[] = [
  {
    id: 're-room-1',
    name: 'Conference Room A',
    type: 'room',
    capacity: 12,
    location: '2nd Floor, East Wing',
    amenities: ['projector', 'whiteboard', 'video-conf', 'wifi'],
    description: 'Large conference room with state-of-the-art AV equipment',
    isAvailable: true
  },
  {
    id: 're-room-2', 
    name: 'Meeting Room B',
    type: 'room',
    capacity: 6,
    location: '1st Floor, West Wing',
    amenities: ['tv', 'whiteboard', 'wifi'],
    description: 'Cozy meeting room perfect for small team discussions',
    isAvailable: false,
    nextAvailable: '2:00 PM'
  },
  {
    id: 're-room-3',
    name: 'Board Room',
    type: 'room', 
    capacity: 20,
    location: '3rd Floor, Executive Area',
    amenities: ['projector', 'video-conf', 'wifi', 'coffee'],
    description: 'Executive boardroom with premium furnishings',
    isAvailable: true
  },
  {
    id: 're-room-4',
    name: 'Creative Studio',
    type: 'room',
    capacity: 8,
    location: '2nd Floor, Creative Wing',
    amenities: ['whiteboard', 'wifi', 'coffee'],
    description: 'Open space for brainstorming and creative work',
    isAvailable: true
  }
]

const mockEquipment: Resource[] = [
  {
    id: 're-eq-1',
    name: 'Projector Cart',
    type: 'equipment',
    location: 'Equipment Room',
    amenities: ['portable', 'hdmi', 'wireless'],
    description: 'Portable projector with wireless connectivity',
    isAvailable: true
  },
  {
    id: 're-eq-2',
    name: 'Laptop - Dell XPS',
    type: 'equipment',
    location: 'IT Department',
    amenities: ['windows', 'office', 'presentation'],
    description: 'High-performance laptop for presentations',
    isAvailable: false,
    nextAvailable: 'Tomorrow 9:00 AM'
  },
  {
    id: 're-eq-3',
    name: 'Video Camera Setup',
    type: 'equipment',
    location: 'AV Equipment',
    amenities: ['4k', 'tripod', 'microphone'],
    description: 'Professional video recording equipment',
    isAvailable: true
  }
]

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  projector: Monitor,
  tv: Monitor,
  'video-conf': Video,
  wifi: Wifi,
  coffee: Coffee,
  whiteboard: Monitor,
  portable: Laptop,
  hdmi: Monitor,
  wireless: Wifi,
  windows: Laptop,
  office: Laptop,
  presentation: Monitor,
  '4k': Video,
  tripod: Video,
  microphone: Headphones,
  parking: Car,
  printer: Printer
}

export function ResourceBookingDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [selectedResource, setSelectedResource] = React.useState<Resource | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [capacityFilter, setCapacityFilter] = React.useState<string>("all")
  const [bookingDetails, setBookingDetails] = React.useState({
    title: "",
    startTime: "",
    endTime: "", 
    purpose: ""
  })

  const isOpen = isDialogOpen('resource-booking')

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCapacity = capacityFilter === "all" || 
                           (capacityFilter === "small" && (room.capacity || 0) <= 6) ||
                           (capacityFilter === "medium" && (room.capacity || 0) > 6 && (room.capacity || 0) <= 12) ||
                           (capacityFilter === "large" && (room.capacity || 0) > 12)
    
    return matchesSearch && matchesCapacity
  })

  const filteredEquipment = mockEquipment.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookResource = () => {
    if (!selectedResource || !bookingDetails.title || !bookingDetails.startTime || !bookingDetails.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Booking Confirmed",
      description: `Successfully booked ${selectedResource.name} for ${format(selectedDate, 'MMM dd, yyyy')} from ${bookingDetails.startTime} to ${bookingDetails.endTime}`,
    })

    // Reset form
    setSelectedResource(null)
    setBookingDetails({ title: "", startTime: "", endTime: "", purpose: "" })
    closeDialog('resource-booking')
  }

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <div 
      className={cn(
        "group p-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        selectedResource?.id === resource.id 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border hover:border-primary/50"
      )}
      onClick={() => setSelectedResource(resource)}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {resource.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{resource.location}</span>
              {resource.capacity && (
                <>
                  <span>•</span>
                  <Users className="h-3 w-3" />
                  <span>{resource.capacity} people</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {resource.isAvailable ? (
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <Check className="h-3 w-3 mr-1" />
                Available
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                <X className="h-3 w-3 mr-1" />
                Busy
              </Badge>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{resource.description}</p>

        {resource.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Monitor
              return (
                <div key={amenity} className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md text-xs">
                  <Icon className="h-3 w-3" />
                  <span className="capitalize">{amenity.replace('-', ' ')}</span>
                </div>
              )
            })}
          </div>
        )}

        {!resource.isAvailable && resource.nextAvailable && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
            <Clock className="h-3 w-3" />
            <span>Next available: {resource.nextAvailable}</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('resource-booking')}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Resource Booking
          </DialogTitle>
          <DialogDescription>
            Book meeting rooms and equipment for your team
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-6 h-[70vh]">
          {/* Left Panel - Resource Selection */}
          <div className="flex-1 space-y-4">
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="rooms" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Meeting Rooms
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  Equipment
                </TabsTrigger>
              </TabsList>

              {/* Search and Filters */}
              <div className="flex gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="small">Small (≤6)</SelectItem>
                    <SelectItem value="medium">Medium (7-12)</SelectItem>
                    <SelectItem value="large">Large (13+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="rooms" className="mt-4">
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-3 pr-4">
                    {filteredRooms.map((room) => (
                      <ResourceCard key={room.id} resource={room} />
                    ))}
                    {filteredRooms.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No rooms found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="equipment" className="mt-4">
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-3 pr-4">
                    {filteredEquipment.map((equipment) => (
                      <ResourceCard key={equipment.id} resource={equipment} />
                    ))}
                    {filteredEquipment.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Laptop className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No equipment found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          <Separator orientation="vertical" className="h-full" />

          {/* Right Panel - Booking Details */}
          <div className="w-80 space-y-4">
            {selectedResource ? (
              <>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold text-lg">{selectedResource.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedResource.location}</p>
                  {selectedResource.capacity && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Users className="h-3 w-3" />
                      <span>Up to {selectedResource.capacity} people</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="booking-title">Meeting Title *</Label>
                    <Input
                      id="booking-title"
                      placeholder="e.g., Team Standup"
                      value={bookingDetails.title}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "MMM dd, yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="start-time">Start Time *</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={bookingDetails.startTime}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time *</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={bookingDetails.endTime}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose (Optional)</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Brief description of the meeting..."
                      value={bookingDetails.purpose}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, purpose: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleBookResource} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Book Resource
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedResource(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="font-medium mb-2">Select a Resource</h3>
                <p className="text-sm">Choose a room or equipment to start booking</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}