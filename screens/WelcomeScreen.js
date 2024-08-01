import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

GoogleSignin.configure({
    webClientId: '466782090041-fohb76jvhidsi6ac0800jeoac8kheoan.apps.googleusercontent.com',
});

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredential);
        } catch (error) {
            console.log('got error: ', error.message);
            if (error.code) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log('Sign in was cancelled');
                        break;
                    case statusCodes.IN_PROGRESS:
                        console.log('Sign in is in progress already');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log('Play services not available or outdated');
                        break;
                    default:
                        console.log('Some other error:', error.message);
                        break;
                }
            } else {
                console.log('An error not related to Google Sign-In occurred');
            }
        }
    };

    return (
        <ScreenWrapper>
            <View className="h-full flex justify-around">
                <View className="flex-row justify-center mt-10">
                    <FastImage source={require('../assets/images/welcome.png')} className="h-96 w-96 shadow" />
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
                            <Image source={require('../assets/images/googleIcon.png')} className="h-8 w-8" />
                            <Text className="text-center text-gray-600 text-lg font-bold">Sign In with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    );
}
