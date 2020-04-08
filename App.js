import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
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