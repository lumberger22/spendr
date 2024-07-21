import { View, Text, Touchable, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors, expenseColors } from '../theme';
import EmptyList from '../components/emptyList';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

const items = [
    {
        id: 1,
        title: 'Ate sandwich',
        amount: 4,
        category: 'food',
    },
    {
        id: 2,
        title: 'Bought a book',
        amount: 20,
        category: 'shopping',
    },
    {
        id: 3,
        title: 'Took a taxi',
        amount: 10,
        category: 'transport',
    },
];

export default function TripExpensesScreen(props) {

    const navigation = useNavigation();
    const { id, place, country } = props.route.params;
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
                        <TouchableOpacity onPress={() => navigation.navigate("AddExpense")} className="p-2 px-3 bg-white border border-gray-300 rounded-full">
                            <Text className={colors.button}>Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 380}}>
                        <FlatList 
                            data={items}
                            ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"}/>}
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