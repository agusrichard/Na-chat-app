import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import ChatCard from '../../components/ChatCard'

export default class ChatRoom extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  }
})