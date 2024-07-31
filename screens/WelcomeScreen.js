import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import { isErrorWithCode } from '@react-native-google-signin/google-signin';
import { signInWithCredential } from 'firebase/auth'
import { auth } from '../config/firebase'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'

export default function WelcomeScreen() {

    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: '466782090041-bbfmpiv26qfk9283t16di9trao7h37ej.apps.googleusercontent.com',
    });

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            // const {idToken} = await GoogleSignin.signIn();
            // const googleCredentials = GoogleAuthProvider.credential(idToken);
            // await signInWithCredential(auth, googleCredentials);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
          } catch (error) {
            console.log('got error: ', error.message)
            if (isErrorWithCode(error)) {
              switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                  // user cancelled the login flow
                  break;
                case statusCodes.IN_PROGRESS:
                  // operation (eg. sign in) already in progress
                  break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                  // play services not available or outdated
                  break;
                default:
                // some other error happened
              }
            } else {
              // an error that's not related to google sign in occurred
            }
        }
    };

  return (
    <ScreenWrapper>
        <View className="h-full flex justify-around">
            <View className="flex-row justify-center mt-10">
                <FastImage source={require('../assets/images/welcome.png')} className="h-96 w-96 shadow"/>
            </View>
            <View className="mx-5 mb-10">
                <Text className={`text-center font-bold text-5xl ${colors.heading} mb-10`}>TripMate</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                    <Text className="text-center text-white text-lg font-bold">Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                    <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signIn()} className="p-3 rounded-full bg-white">
                    <View className="flex-row justify-center items-center space-x-3">
                        <Image source={require('../assets/images/googleIcon.png')} className="h-8 w-8"/>
                        <Text className="text-center text-gray-600 text-lg font-bold">Sign In with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}