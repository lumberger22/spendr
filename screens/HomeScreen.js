import { View, Text, Touchable, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import { auth, tripsRef } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore';

export default function HomeScreen() {

    const navigation = useNavigation();
    const {user} = useSelector(state => state.user);
    const [trips, setTrips] = React.useState([]);

    const isFocused = useIsFocused();

    const handleLogout = async () => {
        await signOut(auth);
    }

    const fetchTrips = async () => {
        const q = query(tripsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({...doc.data(), id: doc.id});
        });
        setTrips(data);
    }

    useEffect(() => {
        fetchTrips();
    }, [isFocused]);

    return (
        <ScreenWrapper class="flex-1">
            <View className="flex-row justify-between items-center p-4">
                <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>TripMate</Text>
                <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className={colors.button}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
                <Image source={require('../assets/images/banner.png')} className="w-64 h-64" />
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
                        data={trips}
                        numColumns={2}
                        ListEmptyComponent={
                            <View className="flex-1 justify-center items-center my-5 space-y-3">
                                    <Image source={require('../assets/images/empty.png')} className="w-36 h-36 shadow"/>
                                    <Text className="font-bold text-gray-800">You Haven't Recorded Any Trips Yet</Text>
                                </View>
                        }
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        className="mx-1"
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
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