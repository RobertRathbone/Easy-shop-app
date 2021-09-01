import React from 'react'
import { createStackNavigator } from '@react-navigator/stack'

import ProductContainer from '../Screens/Products/ProductContainer'

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='home'
                compomnent={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}
