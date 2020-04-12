import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ProfileChoice(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Icon name={props.iconType} size={30} style={styles.icon} color="#cf03fc" />
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{props.title}</Text>
        <Text style={styles.textDesc}>{props.desc}</Text>
      </View>
      <View style={{ position: 'absolute', right: 0 }} >
        <Icon name="chevron-right" size={30} color="#999" />
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  icon: {
    marginRight: 5,
  },
  textContainer: {
    marginHorizontal: 20
  },  
  textTitle: {
    fontSize: 18
  },
  textDesc: {
    fontSize: 14,
    color: '#aaa'
  }
})