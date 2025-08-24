import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import React from 'react'

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()

  // Wait until Clerk auth state is loaded to avoid flicker
  if (!isLoaded) return null

  if (!isSignedIn) {
    // If not signed in, send user to the auth sign-in flow
    return <Redirect href="/(auth)/sign-in" />
  }

  // If signed in, funnel to the (home) group
  return <Redirect href="/(home)" />
}
