import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import BackButton from '../components/backButton';

export default function SignUpScreen() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigation = useNavigation();

    const handleSignUp = () => {
        if (email && password) {
            // Sign Up the user
            navigation.goBack();
            navigation.navigate('Home');
        } else {
            // show error message
        }
    }

  return (
    <ScreenWrapper>
        <View className="flex justify-between h-full mx-4">
            <View>
                <View className="relative flex-row justify-center">
                    <View className="absolute top-0 left-0">
                        <BackButton />
                    </View>

                    <Text className={`${colors.heading} text-xl font-bold text-center mt-1`}>Sign Up</Text>
                </View>

                <View className="flex-row justify-center my-3 mt-5">
                    <Image className="h-80 w-80" source={require('../assets/images/login.png')} />
                </View>
                <View className="space-y-2 mx-2">
                    <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                    <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                    <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
                    <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleSignUp()} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                    <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}