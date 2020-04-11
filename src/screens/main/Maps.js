import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native'
import { db, auth } from '../../config/Firebase'

export default class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      markers: [
        {
          latitude: -5.995568168191417,
          longitude: 106.0258511232789
        },
        {
          latitude: -5.995568168191417,
          longitude: 106.0258511232789
        },
        {
          latitude: -5.995568168191417,
          longitude: 106.0258511232789
        }
      ]
    }
    this.chatRef = db.ref('users')
  }

  listenForChats(ref) {
    // console.log('\n')
    // console.log('logged in user', auth.currentUser.uid)
    this.setState({
      isLoading: true
    })
    ref.on('value', snap => {
      // console.log('snap', snap.val())
      let users = []
      snap.forEach(item => {
        // console.log('item', item.key)
        if (item.key != auth.currentUser.uid) {
          users.push({...Object.values(item.val())[0], ...Object.values(item.val())[1]})
        }
      })
      this.setState({ users, isLoading: false })
    })
  }

  componentDidMount() {
    this.listenForChats(this.chatRef)
  }

  componentWillUnmount() {
    this.chatRef.off()
  }

  render() {
    // this.state.users.forEach(user => {
    //   console.log('\n')
    //   console.log('user latitude', user.latitude)
    //   console.log('user longitude', user.longitude)
    //   console.log('user name', user.name)
    // })
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: -5.995568168191417,
            longitude: 106.0258511232789,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >

          { !this.state.isLoading && this.state.users.filter(user => user.hasOwnProperty('latitude')).map(user => {
            console.log('\n')
            console.log('user.name', user.name)
            return (
              <Marker 
                coordinate={{
                  latitude: user.latitude,
                  longitude: user.longitude
                }}
              />
            )
          }) }
        </MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });