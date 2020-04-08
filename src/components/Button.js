import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function Button(props) {
  return (
    <TouchableOpacity 
      style={styles.buttonContainer}
      activeOpacity={0.75}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  }
})