import React from 'react'
import { View, Text } from 'react-native'

import Router from './src/config/Router'
import Friends from './src/screens/main/Friends'
import Profile from './src/screens/user/Profile'
import Chats from './src/screens/main/Chats'

export default class App extends React.Component {

  render() {
    return <Chats />
  }
}