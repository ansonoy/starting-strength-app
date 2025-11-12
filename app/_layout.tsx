import "@/global.css"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    // <AuthProvider>
    <AuthGate />
    // </AuthProvider>
  )
}

function AuthGate() {
  // const { isLoading, isAuthenticated } = useAuth()
  // if (isLoading) return null
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  )
}
