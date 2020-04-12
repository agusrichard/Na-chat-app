import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'

export default function ChatCard(props) {
  console.log('user image', props.chat.user.image)
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image 
        source={props.chat.user.image ? props.chat.user.image : require('../assets/images/components/account.png')}
        style={styles.userImage}
      />
      <View>
        <Text>{props.chat.user.name}</Text>
        <Text>{props.chat.text}</Text>
      </View>
    </TouchableOpacity>
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