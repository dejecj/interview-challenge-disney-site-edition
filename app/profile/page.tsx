"use client"

import { ProfileForm } from "@/components/profile-form"
import { ProfileView } from "@/components/profile-view"
import { getUserProfile, setUserProfile } from "@/lib/cookies"
import { UserProfile } from "@/types/user-profile"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedProfile = getUserProfile()
    if (!savedProfile) {
      setIsEditing(true)
    } else {
      setProfile(savedProfile)
    }
  }, [])

  const handleSubmit = (data: UserProfile) => {
    setUserProfile(data)
    setProfile(data)
    setIsEditing(false)
    toast({
      title: "Profile updated successfully"
    });
  }

  return (
    <div className="container px-6 py-8">
      <div className="bg-gray-50 p-12">
        {isEditing ? (
          <ProfileForm
            initialData={profile}
            onSubmit={handleSubmit}
            onCancel={profile ? () => setIsEditing(false) : undefined}
          />
        ) : profile ? (
          <ProfileView
            profile={profile}
            onEdit={() => setIsEditing(true)}
          />
        ) : null}
      </div>
    </div>
  )
}

