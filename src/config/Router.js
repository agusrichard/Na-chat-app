import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { auth, db, storage } from '../config/Firebase'
import ProfileNavigateButton from '../components/ProfileNavigateButton'


// ================= Import screens ========================
import Splash from '../screens/Splash'

// Auth Screens
import AuthLanding from '../screens/auth/AuthLanding'
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'

// User Screens
import Profile from '../screens/user/Profile'
import EditProfile from '../screens/user/EditProfile'

// Main Screens
import Maps from '../screens/main/Maps'
import Friends from '../screens/main/Friends'
import ChatRoom from '../screens/main/ChatRoom'
import Chats from '../screens/main/Chats'

// Creating Navigator
const MaterialTopTabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export default class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {}
    }
    // auth.onAuthStateChanged(this.onAuthStateChanged)
  }

  componentDidMount() {
    console.log('router cuurent user', auth.currentUser)
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      console.log('userId', userId)
      db.ref('users/' + userId).on('value', snap =>{
        const user = snap.val()
        this.setState({ user: user })
      })
    }
  }

  componentWillUnmount() {
    db.ref('users').off()
  }


  createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator
        initialRouteName="ChatRoom"
        backBehavior="none"
      >
        <MaterialTopTabs.Screen name="Maps" component={Maps} />
        <MaterialTopTabs.Screen
          name="ChatRoom" 
          component={ChatRoom}
          options={{ title: 'Chat Room' }}
        />
        <MaterialTopTabs.Screen name="Friends" component={Friends} />
      </MaterialTopTabs.Navigator>
    )
  }

  createStack = () => {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="AuthLanding" component={AuthLanding} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen 
            name="TopTabs" 
            children={this.createTopTabs}
            options={{ 
              title: 'Na?',
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#dcaaf0'
              },
              headerTitleStyle: {
                fontSize: 26
              },
              headerTintColor: '#fff',
              headerRight: () => (
                <ProfileNavigateButton imageUrl={this.state.user.image}/>
              )
            }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
          <Stack.Screen name="Chats" component={Chats} />
      </Stack.Navigator>
    )
  }

  // onAuthStateChanged = (user) => {
  //   console.log('User in router', user)
  //   if (user) {
  //     console.log('will this ran?')
  //     this.setState(prevState => ({ isLoggedIn: !prevState.isLoggedIn }))
  //   }
  // }

  render() {
    console.log('is user logged in', this.state.isLoggedIn)

    return (
      <NavigationContainer>
        {this.createStack()}
      </NavigationContainer>
    )
  }
}