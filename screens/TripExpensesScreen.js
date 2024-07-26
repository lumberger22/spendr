import { View, Text, Touchable, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors, expenseColors } from '../theme';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import { expensesRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export default function TripExpensesScreen(props) {

    const navigation = useNavigation();
    const { id, place, country } = props.route.params;
    const isFocused = useIsFocused();
    const [expenses, setExpenses] = React.useState([]);

    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({...doc.data(), id: doc.id});
        });
        setExpenses(data);
    }

    useEffect(() => {
        fetchExpenses();
    }, [isFocused]);

    return (
        <ScreenWrapper class="flex-1">
            <View className="px-4">
                <View className="relative flex-row justify-center">
                        <View className="absolute top-0 left-0 z-10">
                            <BackButton />
                        </View>
                        <View>
                            <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
                            <Text className={`${colors.heading} text-s text-center`}>{country}</Text>
                        </View>
                </View>
                <View className="flex-row justify-center items-center rounded-xl mb-4">
                    <Image source={require('../assets/images/7.png')} className="w-80 h-80" />
                </View>
                <View className="space-y-3">
                    <View className="flex-row justify-between items-center">
                        <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AddExpense", {id, place, country})} className="p-2 px-3 bg-white border border-gray-300 rounded-full">
                            <Text className={colors.button}>Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 380}}>
                        <FlatList 
                            data={expenses}
                            ListEmptyComponent={
                                <View className="flex-1 justify-center items-center my-5 space-y-3">
                                    <Image source={require('../assets/images/empty.png')} className="w-36 h-36 shadow"/>
                                    <Text className="font-bold text-gray-800">You Haven't Recorded Any Expenses Yet</Text>
                                </View>
                            }
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({item}) => {
                                return (
                                    <View style={{backgroundColor: expenseColors[item.category]}}className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl">
                                        <View>
                                            <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
                                            <Text className={`${colors.heading} text-xs`}>{item.category}</Text>
                                        </View>
                                        <View>
                                            <Text>${item.amount}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}