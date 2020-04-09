import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { withNavigation } from 'react-navigation'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'

class AuthLandingOriginal extends React.Component {

  render() {
    const image = require('../../assets/images/auth/authLandingPage.jpg')

    return (
      <ImageBackground source={image} 
        style={styles.imageBackground}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Na?</Text>
            <Text style={styles.quoteText}>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.”</Text>
            <Text style={styles.authorText}> – Steve Jobs</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" onPress={this.props.navigation.navigate('Register')}/>
            <View style={styles.signinText}>
              <Text style={{ color: '#fff' }}>Already have an account?</Text>
              <TouchableOpacity onPress={this.props.navigation.navigate('Login')}>
                <Text style={styles.redirectText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  imageBackground: { 
    width: '100%', 
    height: '100%'
  },
  container: {
    height: '100%',
    width: '100%',
    padding: 25,
    alignItems: 'center'
  },
  headerContainer: {
    flex: 5
  },
  buttonContainer: {
    flex: 1
  },
  titleText: {
    fontSize: 75,
    marginBottom: 15,
    color: '#fff',
    fontFamily: 'Rokkit-ExtraBold',
    color: '#eb9bd6'
  },
  quoteText: {
    fontFamily: 'Rokkit-ExtraLight',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#fff'
  },
  authorText: {
    fontFamily: 'ComicNeue-BoldItalic',
    fontSize: 24,
    color: '#772978'
  },
  signinText: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  redirectText: {
    color: '#e3c5e3',
    marginLeft: 10
  }
});

const AuthLanding = withNavigation(AuthLandingOriginal)

export default AuthLanding