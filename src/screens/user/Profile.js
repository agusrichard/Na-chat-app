import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import ProfileChoice from '../../components/ProfileChoice'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { auth } from '../../config/Firebase'


export default class Profile extends React.Component {

  handleLogout = () => {
    auth.signOut()
    this.props.navigation.navigate('Splash')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../assets/images/components/account.png')} 
            style={styles.userImage}
          />
          <View style={styles.textBox}>
            <Text style={styles.name}>Agus Richard Lubis</Text>
            <Text style={styles.username}>@agusrichard</Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <Text style={[styles.friendText, {borderRightColor: '#cf03fc', borderRightWidth: StyleSheet.hairlineWidth, borderTopRightRadius: 5}]}>Friends</Text>
          <Text style={[styles.friendText, {borderLeftColor: '#cf03fc', borderLeftWidth: StyleSheet.hairlineWidth, borderTopLeftRadius: 5}]}>99</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>Status:</Text>
          <Text>
            Twenty-five years and my life is still
            Trying to get up that great big hill of hope
            For a destination
          </Text>
        </View>
        <View style={styles.choicesBox}>
          <ProfileChoice 
            iconType="edit"
            title="Edit Profile"
            desc="Edit name and profile picture"
          />
          <ProfileChoice 
            iconType="question-circle"
            title="Help"
            desc="FAQ, contact us, privacy policy"
          />
          <ProfileChoice 
            iconType="palette"
            title="Background"
            desc="Change Background"
          />
        </View>
        <View style={styles.logout}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ () => this.handleLogout() }>
            <Icon name="sign-out-alt" size={25} style={{ marginRight: 15 }} color="red" />
            <Text style={{ color: 'red', fontSize: 20 }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  userImage: {
    width: 85,
    height: 85
  },
  textBox: {
    marginLeft: 25
  },
  name: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 24,
    marginBottom: 5
  },
  username: {
    fontFamily: 'ComicNeue-Italic',
    fontSize: 18
  },
  secondContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  friendText: {
    flex: 1,
    padding: 20,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'ComicNeue-Regular',
    borderBottomColor: '#cf03fc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cf03fc',
    borderTopWidth: StyleSheet.hairlineWidth,
    color: '#666'
  },
  statusContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10
  },
  choicesBox: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  logout: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 3
  }
})