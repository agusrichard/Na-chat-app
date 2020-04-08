import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation-stack';

// ================= Import screens ========================
import Splash from '../screens/Splash'

// Auth Screens
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'

const SplashNav = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    }
  }
})

const AuthNav = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  }
})


const SwitchNav = createSwitchNavigator({
  SplashNav,
  AuthNav
})

const AppContainer = createAppContainer(SwitchNav)

// create a component
class Router extends Component {
  render() {
      return <AppContainer />
  }
}

//make this component available to the app
export default Router;