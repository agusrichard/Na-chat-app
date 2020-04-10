import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function ProfileNavigateButton(props) {
  console.log('ProfileNavigateButton', props)

  return (
    <TouchableOpacity 
      onPress={props.onPress}
      style={styles.container}
    >
      <Image 
        source={require('../assets/images/components/account.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },  
  icon: {
    width: 35,
    height: 35
  }
})