import { View, Text, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import BackButton from '../components/backButton'

export default function AddTripScreen() {

    const [place, setPlace] = React.useState('');
    const [country, setCountry] = React.useState('');

    const navigation = useNavigation();

    const handleAddTrip = () => {
        if (place && country) {
            // add trip to the list
            navigation.navigate('Home');
        } else {
            // show error message
        }
    }

  return (
    <ScreenWrapper>
        <View className="flex justify-between h-full mx-4">
            <View>
                <View className="relative mt-5 flex-row justify-center">
                    <View className="absolute top-0 left-0">
                        <BackButton />
                    </View>

                    <Text className={`${colors.heading} text-xl font-bold text-center mt-1`}>Add Trip</Text>
                </View>

                <View className="flex-row justify-center my-3 mt-5">
                    <Image className="h-72 w-72" source={require('../assets/images/4.png')} />
                </View>
                <View className="space-y-2 mx-2">
                    <Text className={`${colors.heading} text-lg font-bold`}>Where On Earth?</Text>
                    <TextInput value={place} onChangeText={value => setPlace(value)} className="p-4 bg-white rounded-full mb-3" />
                    <Text className={`${colors.heading} text-lg font-bold`}>Which Country?</Text>
                    <TextInput value={country} onChangeText={value => setCountry(value)} className="p-4 bg-white rounded-full mb-3" />
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleAddTrip()} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                    <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}