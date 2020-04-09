import React from 'react'
import { db, auth } from '../../config/Firebase'
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      errorMessage: '',
      isSuccess: false
    }

    auth.onAuthStateChanged(this.onAuthStateChanged)
  }

  onAuthStateChanged = (user) => {
    if (user) {
        db.ref().child('users').push({
            email: user.email,
            uid: user.uid,
            name: this.state.name
        })
        this.setState({
            isLoading: false,
            isSuccess: true
        })
    }
}

  register = () => {
    this.setState({
      errorMessage: null,
      isLoading: true 
    })
    const {email, password} = this.state;
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error in register:', errorMessage)
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
          { this.state.isSuccess ? 
            <Text>Success</Text>
            :
            <Button 
              title="Sign Up"
              isLoading={this.state.isLoading}
              onPress={() => this.register()}
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
    backgroundColor: '#fff'
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