import Cookies from 'js-cookie'
import { UserProfile } from '@/types/user-profile'

const PROFILE_COOKIE_KEY = 'user_profile'

export const getUserProfile = (): UserProfile | null => {
  const profileData = Cookies.get(PROFILE_COOKIE_KEY)
  if (!profileData) return null
  
  try {
    return JSON.parse(profileData)
  } catch {
    return null
  }
}

export const setUserProfile = (profile: UserProfile) => {
  const profileWithTimestamp = {
    ...profile,
    lastUpdated: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
  Cookies.set(PROFILE_COOKIE_KEY, JSON.stringify(profileWithTimestamp), { expires: 365 })
}

