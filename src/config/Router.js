import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// ================= Import screens ========================
import Splash from '../screens/Splash'

// Auth Screens
import AuthLanding from '../screens/auth/AuthLanding'
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'
import Chats from '../screens/main/Chats'

export default class Router extends Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="AuthLanding" component={AuthLanding} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Chats" component={Chats} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}