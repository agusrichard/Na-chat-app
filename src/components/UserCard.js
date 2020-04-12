import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

export default function UserCard(props) {
  console.log('user', props.user)
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image 
        source={props.user.image ? props.user.image : require('../assets/images/components/account.png')}
        style={styles.userImage}
      />
      <View>
        <Text style={styles.name}>{props.user.name}</Text>
        <Text style={styles.status}>{props.user.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 5,
    flexDirection: 'row',
    borderColor: 'purple',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    borderRadius: 5
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 25
  },
  name: {
    fontSize: 18,
    fontFamily: 'ComicNeue-Bold'
  },
  status: {
    fontSize: 14,
    fontFamily: 'ComicNeue-Light'
  }
})