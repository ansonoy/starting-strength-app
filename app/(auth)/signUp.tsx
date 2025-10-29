import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const onSignUp = async () => {
    setError('');
    setInfo('');

    if (!name) {
      setError('Please enter your name.');
      return;
    }
    if (!email || !password) {
      setError('Please enter an email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is required, session will be null
    if (data?.session) {
      router.replace('/(app)/home');
      return;
    }

    setInfo('Check your email for a confirmation link to complete sign up.');
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-3xl font-bold">Create Account</Text>

      <TextInput
        className="mb-4 rounded-xl border border-gray-300 p-3"
        placeholder="Full name"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />

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
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <View className="-mt-2 mb-2 items-end">
        <Pressable onPress={() => setShowPassword((s) => !s)}>
          <Text className="text-blue-600">{showPassword ? 'Hide' : 'Show'} password</Text>
        </Pressable>
      </View>

      <TextInput
        className="mb-4 rounded-xl border border-gray-300 p-3"
        placeholder="Confirm Password"
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View className="-mt-2 mb-2 items-end">
        <Pressable onPress={() => setShowConfirmPassword((s) => !s)}>
          <Text className="text-blue-600">{showConfirmPassword ? 'Hide' : 'Show'} password</Text>
        </Pressable>
      </View>

      {error ? <Text className="mb-3 text-center text-red-500">{error}</Text> : null}
      {info ? <Text className="mb-3 text-center text-green-600">{info}</Text> : null}

      <Pressable
        onPress={onSignUp}
        className="items-center rounded-xl bg-blue-600 py-3"
        disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-lg font-semibold text-white">Sign Up</Text>
        )}
      </Pressable>

      <View className="mt-6 items-center">
        <Text>
          Already have an account?{' '}
          <Link href="/(auth)" className="font-semibold text-blue-600">
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
}
