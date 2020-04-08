import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Register extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Na?</Text>
          <Text style={styles.quoteText}>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.” – Steve Jobs</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Register Button</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 10,
    justifyContent: "space-around"
  },
  headerContainer: {
    flex: 2
  },
  buttonContainer: {
    flex: 1
  },
  quoteText: {
    fontFamily: 'ComicNeue-Light'
  }
});