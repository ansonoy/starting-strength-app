import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.session) {
      router.replace('/(app)/home');
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-3xl font-bold">Welcome Back</Text>

      <TextInput
        className="mb-4 rounded-xl border border-gray-300 p-3"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="mb-4 rounded-xl border border-gray-300 p-3"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text className="mb-3 text-center text-red-500">{error}</Text> : null}

      <Pressable
        onPress={signIn}
        className="items-center rounded-xl bg-blue-600 py-3"
        disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-lg font-semibold text-white">Sign In</Text>
        )}
      </Pressable>

      <View className="mt-6 items-center">
        <Text>
          Don’t have an account?{' '}
          <Link href="/(auth)/sign-up" className="font-semibold text-blue-600">
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
