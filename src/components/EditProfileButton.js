import React from 'react'
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

export default function Button(props) {
  
  return (
    <TouchableOpacity 
      style={styles.buttonContainer}
      activeOpacity={0.75}
      onPress={props.onPress}
    > 
      {
        props.isLoading ?
        <ActivityIndicator size="small" color="#fff" />
        :
        <Text style={styles.buttonText}>{props.title}</Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
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