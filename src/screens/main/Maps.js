import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native'
import { db, auth } from '../../config/Firebase'

export default class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.user = auth.currentUser
    this.ref = db.ref('users')
  }

  listenForUsers(usersRef) {
    usersRef.on('value', (snap) => {
      console.log('friends snap', snap.val())
      let items = []
      snap.forEach(item => {
        var user = item.val()
        console.log('In Friends.js user', user)
        if (this.user.uid !== user.uid) {
          items.push(user)
        }
      })

      console.log('items users', items)
      this.setState({
        users: items
      })
    })
  }

  componentDidMount() {
    this.listenForUsers(this.ref)
  }

  componentWillUnmount() {
    this.ref.off()
  }

  render() {
    this.state.users.forEach(user => {
      console.log('\n')
      console.log('In Maps.js user', user.coords)
    })
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
          { this.state.users.filter(user => user.hasOwnProperty('coords')).forEach(user => {
            console.log('user in here', user)
            console.log('user latitude', user.coords.latitude)
            console.log('user longitude', user.coords.longitude)
            return (
              <Marker
                title={user.name}
                coordinate={{
                  latitude: user.coords.latitude,
                  longitude: user.coords.longitude
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