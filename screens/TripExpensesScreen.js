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
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

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

    const aggregateData = expenses.reduce((acc, { category, amount }) => {
        const categoryAmount = parseFloat(amount);
        if (acc[category]) {
            acc[category] += categoryAmount;
        } else {
            acc[category] = categoryAmount;
        }
        return acc;
    }, {});
      
    const data = Object.keys(aggregateData).map(category => ({
        name: category,
        amount: aggregateData[category],
        color: expenseColors[category],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
    }));

    const totalAmountSpent = expenses.reduce((total, { amount }) => total + parseFloat(amount), 0);


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
                <Text className="mt-6 text-2xl text-center">Total Expenses: ${totalAmountSpent}</Text>
                    {
                        totalAmountSpent > 0 ? (
                            <>
                            <View className="mt-1 mb-3 flex-row items-center gap-5 justify-center">
                                <View className="w-52">
                                    <PieChart
                                        data={data}
                                        width={screenWidth}
                                        height={220}
                                        chartConfig={{
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        }}
                                        accessor="amount"
                                        backgroundColor="transparent"
                                        hasLegend={false}
                                        absolute
                                    />
                                </View>
                                <View>
                                    {data.map((item) => (
                                        <View key={item.name} className="flex-row m-0.5 items-center">
                                            <View className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color}} />
                                            <Text style={{ color: '#7F7F7F', fontSize: 15 }}>${item.amount} {item.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            </>
                        ): ( 
                            <View className="mb-5"/>
                        )
                    }
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