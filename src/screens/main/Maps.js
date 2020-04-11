import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native'
import { db, auth } from '../../config/Firebase'

export default class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.chatRef = db.ref('users')
  }

  listenForChats(ref) {
    console.log('\n')
    console.log('logged in user', auth.currentUser.uid)
    ref.on('value', snap => {
      console.log('snap', snap.val())
      snap.forEach(item => {
        console.log('item', item.val())
      })
    })
  }

  componentDidMount() {
    this.listenForChats(this.chatRef)
  }

  componentWillUnmount() {
    this.chatRef.off()
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
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