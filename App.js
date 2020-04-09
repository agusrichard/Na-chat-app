import React from 'react'
import { View, Text } from 'react-native'
import Router from './src/config/Router'
import Register from './src/screens/auth/Register'

export default class App extends React.Component {

  render() {
    return (
      <View>
        <Register />
      </View>
    )
  }
}