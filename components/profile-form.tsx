"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserProfile } from "@/types/user-profile"
import { useState } from "react"

interface ProfileFormProps {
  initialData?: UserProfile | null
  onSubmit: (data: UserProfile) => void
  onCancel?: () => void
}

export function ProfileForm({ initialData, onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    birthDate: initialData?.birthDate || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    favoriteCharacter: initialData?.favoriteCharacter || '',
    favoriteMovie: initialData?.favoriteMovie || '',
    favoriteRide: initialData?.favoriteRide || '',
    favoriteDisneyland: initialData?.favoriteDisneyland || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">
          Birth Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="birthDate"
          type="date"
          required
          value={formData.birthDate}
          onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">CA</SelectItem>
              <SelectItem value="FL">FL</SelectItem>
              {/* Add more states as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="favoriteCharacter">Favorite Disney Character</Label>
        <Input
          id="favoriteCharacter"
          value={formData.favoriteCharacter}
          onChange={(e) => setFormData(prev => ({ ...prev, favoriteCharacter: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="favoriteMovie">Favorite Disney Movie</Label>
        <Input
          id="favoriteMovie"
          value={formData.favoriteMovie}
          onChange={(e) => setFormData(prev => ({ ...prev, favoriteMovie: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="favoriteRide">Favorite Disney Ride</Label>
        <Input
          id="favoriteRide"
          value={formData.favoriteRide}
          onChange={(e) => setFormData(prev => ({ ...prev, favoriteRide: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="favoriteDisneyland">Favorite Disneyland</Label>
        <Select
          value={formData.favoriteDisneyland}
          onValueChange={(value) => setFormData(prev => ({ ...prev, favoriteDisneyland: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select park" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Disney World, Florida">Disney World, Florida</SelectItem>
            <SelectItem value="Disneyland, California">Disneyland, California</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-teal-900 hover:bg-teal-800">
          Update Profile
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

