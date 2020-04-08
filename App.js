import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import AuthLanding from './src/screens/auth/AuthLanding'

export default class App extends React.Component {

  render() {
    return (
      <View>
        <AuthLanding />
      </View>
    )
  }
}