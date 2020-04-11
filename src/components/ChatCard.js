import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'

export default function ChatCard(props) {

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/components/account.png')}
        style={styles.userImage}
      />
      <View>
        <Text>{props.chat.name}</Text>
        <Text>{props.chat.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'purple',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 20
  }
})