import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

export default class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/auth/registerImage.jpg')} style={styles.logo} />
          <View style={styles.formContainer}>
            <TextField 
              iconSource={require('../../assets/images/components/email.png')}
              placeholder="Email"
            />
            <TextField 
              iconSource={require('../../assets/images/components/password.png')}
              placeholder="Password"
            />
            <TextField 
              iconSource={require('../../assets/images/components/name.png')}
              placeholder="Name"
            />
          </View>
          <Button title="Sign Up" />
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center'
  },
  logo: {
    marginTop: 30,
    width: 130,
    height: 130,
    alignSelf: 'center',
    borderRadius: 20
  },
  formContainer: {
    marginVertical: 30
  }
});