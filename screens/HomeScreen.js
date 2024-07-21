import { View, Text, Touchable, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

const items = [
    {
        id: 1,
        place: 'New York',
        country: 'USA',
    },
    {
        id: 2,
        place: 'Paris',
        country: 'France',
    },
    {
        id: 3,
        place: 'London',
        country: 'UK',
    },
    {
        id: 4,
        place: 'Tokyo',
        country: 'Japan',
    },
    {
        id: 5,
        place: 'Sydney',
        country: 'Australia',
    },
    { 
        id: 6,
        place: 'Los Angeles',
        country: 'USA',
    }
];

export default function HomeScreen() {

    const navigation = useNavigation();

    return (
        <ScreenWrapper class="flex-1">
            <View className="flex-row justify-between items-center p-4">
                <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>TripMate</Text>
                <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className={colors.button}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
                <Image source={require('../assets/images/banner.png')} className="w-60 h-60" />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AddTrip")} className="p-2 px-3 bg-white border border-gray-300 rounded-full">
                        <Text className={colors.button}>Add Trip</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 380}}>
                    <FlatList 
                        data={items}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"}/>}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        className="mx-1"
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate("TripExpenses", {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                                    <View>
                                        <Image source={randomImage()} className="w-36 h-36 mb-2" />
                                        <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                                        <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
}