import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
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