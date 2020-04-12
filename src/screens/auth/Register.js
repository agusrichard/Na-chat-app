import React from 'react'
import { db, auth } from '../../config/Firebase'
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native'
import TextField from '../../components/TextField'
import Button from '../../components/Button'

export default class Register extends React.Component {

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
  }

  handleValidation = () => {
    const { name, email, password } = this.state
    if (name && email && password) {
      this.setState({
        errorMessage
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
      .then(cred => {
        db.ref('users/' + cred.user.uid).set({
          email: this.state.email,
          uid: cred.user.uid,
          name: this.state.name,
          image: '',
          status: "Hi... I am using 'Na?'. Come and join!",
          date: ''
        })
        this.setState({
            isLoading: false,
            isSuccess: true,
            name: '',
            email: '',
            password: ''
        })
        this.props.navigation.navigate('TopTabs')
      })
      .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error in register:', errorMessage)
          this.setState({
              errorMessage: 'Cannot be empty',
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
              errorMessage={this.state.errorMessage}
            />
            <TextField 
              iconSource={require('../../assets/images/components/password.png')}
              placeholder="Password"
              handleChange={(password) => this.setState({password})}
              errorMessage={this.state.errorMessage}
            />
            <TextField 
              iconSource={require('../../assets/images/components/name.png')}
              placeholder="Name"
              handleChange={(name) => this.setState({name})}
              errorMessage={this.state.errorMessage}
            />
          </View>
          <Button 
            title="Sign Up"
            isLoading={this.state.isLoading}
            onPress={() => this.register()}
          />
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
    height: 130,
    alignSelf: 'center',
    borderRadius: 20
  },
  formContainer: {
    marginVertical: 30
  }
});