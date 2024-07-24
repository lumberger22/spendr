import { View, StatusBar, Platform } from 'react-native';
import React from 'react';

export default function ScreenWrapper({ children }) {
    const statusBarHeight = StatusBar.currentHeight || (Platform.OS === 'ios' ? 30 : 0);

    return (
        <View style={{ flex: 1, paddingTop: statusBarHeight }}>
            {children}
        </View>
    );
}
