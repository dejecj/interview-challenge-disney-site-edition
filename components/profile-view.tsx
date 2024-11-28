import { Button } from "@/components/ui/button"
import { UserProfile } from "@/types/user-profile"

interface ProfileViewProps {
  profile: UserProfile
  onEdit: () => void
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  const calculateAge = (birthDate: string) => {
    const age = Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 31557600000)
    return age
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          {profile.firstName} {profile.lastName}
        </h1>
        {profile.lastUpdated && (
          <p className="text-sm text-muted-foreground">
            Last Updated {profile.lastUpdated}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <p>Age: {calculateAge(profile.birthDate)}</p>
        <p>Location: {profile.city}, {profile.state}</p>
        <p>Favorite Disney Character: {profile.favoriteCharacter}</p>
        <p>Favorite Disney Ride: {profile.favoriteRide}</p>
        <p>Favorite Disney Movie: {profile.favoriteMovie}</p>
        <p>Favorite Disneyland: {profile.favoriteDisneyland}</p>
      </div>

      <Button 
        onClick={onEdit}
        className="bg-teal-900 hover:bg-teal-800"
      >
        Edit Profile
      </Button>
    </div>
  )
}

