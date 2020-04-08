import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

export default class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/auth/loginImage.jpg')} style={styles.logo} />
          <View style={styles.formContainer}>
            <TextField 
              iconSource={require('../../assets/images/components/email.png')}
              placeholder="Email"
            />
            <TextField 
              iconSource={require('../../assets/images/components/password.png')}
              placeholder="Password"
            />
          </View>
          <Button title="Sign In" />
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
    height: 140,
    alignSelf: 'center',
    borderRadius: 5
  },
  formContainer: {
    marginVertical: 30
  }
});