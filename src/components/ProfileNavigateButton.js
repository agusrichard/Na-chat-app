import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function ProfileNavigateButton(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Profile')}
      style={styles.container}
    >
      <Image 
        source={ props.imageUrl ? { uri: props.imageUrl } : require('../assets/images/components/account.png')}
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
    height: 35,
    borderRadius: 35/2,
    borderColor: 'purple',
    borderWidth: StyleSheet.hairlineWidth
  }
})