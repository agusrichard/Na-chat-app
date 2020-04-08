import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

export default class App extends React.Component {

  state = {
    myCoordinate: {
      latitude: -6.6204897,
      longitude: 106.8163102,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
  }

  render() {
    return (
      <View>
        <MapView
          ref="map"
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.myCoordinate}
        >
          <Marker 
            coordinate={this.state.myCoordinate}
          />
        </MapView>
        <Button title="Move" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  map: {
    height: 300,
    width: '100%'
  },
 });