import React from 'react'
import { View, Text } from 'react-native'
import Router from './src/config/Router'
import Login from './src/screens/auth/Login'

export default class App extends React.Component {

  render() {
    return (
      <View>
        <Login />
      </View>
    )
  }
}