import React from "react";
import { View, Text, Image } from "react-native";

export default function EmptyList({message}) {
  return (
    <View className="flex-1 justify-center items-center my-5 space-y-3">
        <Image source={require('../assets/images/empty.png')} className="w-36 h-36 shadow"/>
        <Text className="font-bold text-gray-400">{message || 'data not found'}</Text>
    </View>
  );
}