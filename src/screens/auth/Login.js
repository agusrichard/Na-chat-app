import React from 'react'
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native'
import { db, auth } from '../../config/Firebase'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSuccess: false,
      errorMessage: ''
    }

    auth.onAuthStateChanged(this.onAuthStateChanged)
  }


  onAuthStateChanged = (user) => {
    if (user) {
      console.log('onAuthStateChanged', user)
      this.setState({
          isLoading: false,
          isSuccess: true
      })
    }
  }


  login = () => {
    this.setState({
      errorMessage: null,
      isLoading: true 
    })
    const {email, password} = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        this.setState({
            errorMessage,
            isLoading: false
        })
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/auth/loginImage.png')} style={styles.logo} />
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
          { this.state.isSuccess ? 
            <Text>Success</Text>
            :
            <Button 
              title="Sign Up"
              isLoading={this.state.isLoading}
              onPress={() => this.login()}
            />
          }
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
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