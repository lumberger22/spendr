import { View, Text, Image, TextInput, Touchable, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import BackButton from '../components/backButton'
import { categories } from '../constants'
import Snackbar from 'react-native-snackbar'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from '../components/loading'

export default function AddExpenseScreen(props) {

    let {id} = props.route.params;

    const [title, setTitle] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [time, setTime] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const navigation = useNavigation();

    const handleAddExpense = async () => {
        if(title && amount && category) {
            setLoading(true);

            let doc = await addDoc(expensesRef, {
              title,
              amount,
              category,
              tripId: id,
              time: new Date().toISOString()
            });

            setLoading(false);

            if (doc && doc.id) {
              navigation.goBack();
            }
        } else {
          Snackbar.show({
            text: 'Please fill all the fields',
            backgroundColor: 'red',
        });
        }
    }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'resize'}
            style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex justify-between h-full mx-4">
                <View>
                    <View className="relative flex-row justify-center">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>

                        <Text className={`${colors.heading} text-xl font-bold text-center mt-1`}>Add Expense</Text>
                    </View>

                    <View className="flex-row justify-center">
                        <Image className="h-72 w-72" source={require('../assets/images/expenseBanner.png')} />
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
                        <TextInput value={title} onChangeText={value => setTitle(value)} className="p-3 px-4 bg-white rounded-full mb-3" />
                        <Text className={`${colors.heading} text-lg font-bold`}>How Much?</Text>
                        <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-3 px-4 bg-white rounded-full mb-3" />
                    </View>
                    <View className="mx-2 space-x-2">
                      <Text className="text-lg font-bold">Category</Text>
                      <View className="flex-row flex-wrap items-center">
                        {
                          categories.map(cat=>{

                            let bgColor = 'bg-white';
                            if (category === cat.value) {
                              bgColor = 'bg-green-200';
                            }

                            return (
                              <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={` rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                                <Text>{cat.title}</Text>
                              </TouchableOpacity>
                            )
                          })
                        }
                      </View>
                    </View>
                </View>

                <View>
                  {
                    loading? (
                        <Loading />
                    ): (
                      <TouchableOpacity onPress={() => handleAddExpense()} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                        <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </ScreenWrapper>
  )
}