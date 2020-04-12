import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TextInputEditProfile(props) {
  const [color, setColor] = useState('#999')
  return (
    <View style={[styles.container, {borderBottomColor: color}]}>
      <Icon name={props.icon} size={20} style={styles.icon} color={color} />
      <TextInput 
        placeholder={props.placeholder > 5 ? props.placeholder.slice(0, 10) : props.placeholder}
        style={styles.input}
        onFocus={() => setColor('#951dd1')}
        onBlur={() => setColor('#999')}
        onChangeText={props.handleChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  icon: {
    marginLeft: 10
  },
  input: {
    width: '100%',
    marginLeft: 20,
    fontSize: 18
  }
})