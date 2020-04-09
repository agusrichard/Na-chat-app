import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Image } from 'react-native'

export default function TextField(props) {
  const [color, setColor] = useState('#999')

  return (
    <View style={[styles.container, {borderBottomColor: color}]}>
      <Image 
        source={props.iconSource} 
        style={styles.icon}
      />
      <TextInput 
        placeholder={props.placeholder}
        onChangeText={props.handleChange}
        value={props.value}
        secureTextEntry={ props.placeholder === 'Password' ? true : false }
        style={styles.textInput}
        onFocus={() => setColor('#951dd1')}
        onBlur={() => setColor('#999')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    width: 300,
    marginVertical: 10
  },
  textInput: {
    padding: 10,
    width: 200,
    fontSize: 20
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 5
  }
})