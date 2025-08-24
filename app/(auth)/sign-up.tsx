import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View className="flex-1 px-6 justify-center">
        <Text className="text-lg font-medium mb-4">Verify your email</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(c) => setCode(c)}
        />
        <TouchableOpacity onPress={onVerifyPress} className="bg-blue-600 rounded-md py-3">
          <Text className="text-center text-white">Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-semibold text-gray-900 mb-6">Sign up</Text>

      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
      />

      <TextInput
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity onPress={onSignUpPress} className="bg-blue-600 rounded-md py-3 mb-4">
        <Text className="text-center text-white font-medium">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row items-center gap-2">
        <Text className="text-sm text-gray-600">Already have an account?</Text>
        <Link href="/sign-in">
          <Text className="text-sm text-blue-600">Sign in</Text>
        </Link>
      </View>
    </View>
  )
}