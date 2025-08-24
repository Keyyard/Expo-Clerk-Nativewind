import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-semibold text-gray-900 mb-6">Sign in</Text>

      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />

      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity onPress={onSignInPress} className="bg-blue-600 rounded-md py-3 mb-4">
        <Text className="text-center text-white font-medium">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row items-center gap-2">
        <Text className="text-sm text-gray-600">Don&apos;t have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-sm text-blue-600">Sign up</Text>
        </Link>
      </View>
    </View>
  )
}