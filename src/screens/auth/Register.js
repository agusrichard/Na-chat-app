import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    loading: false,
    errorMessage: ''
  }

  signup = () => {
    this.setState({
      errorMessage: null,
      loading: true 
    })
    const {email, password} = this.state;
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.setState({
              errorMessage,
              loading: false
          })
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/auth/registerImage.png')} style={styles.logo} />
          <View style={styles.formContainer}>
            <TextField 
              iconSource={require('../../assets/images/components/email.png')}
              placeholder="Email"
              handleChange={(email) => this.setState({email})}
            />
            <TextField 
              iconSource={require('../../assets/images/components/password.png')}
              placeholder="Password"
              handleChange={(password) => this.setState({password})}
            />
            <TextField 
              iconSource={require('../../assets/images/components/name.png')}
              placeholder="Name"
              handleChange={(name) => this.setState({name})}
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


// const Register = withNavigation(Register)

export default Register