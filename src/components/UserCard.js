import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function UserCard(props) {
  console.log('user', props.user)
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/components/account.png')}
        style={styles.userImage}
      />
      <View>
        <Text style={styles.name}>{props.user.name}</Text>
        <Text style={styles.status}>I am having fun bitch!</Text>
      </View>
    </View>
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