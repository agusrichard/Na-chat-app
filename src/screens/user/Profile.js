import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import moment from 'moment'
import ProfileChoice from '../../components/ProfileChoice'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db, auth } from '../../config/Firebase'


export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  handleLogout = () => {
    auth.signOut()
    this.props.navigation.navigate('Splash')
  }

  componentDidMount() {
    const userId = auth.currentUser.uid
    console.log('userId', userId)
    db.ref('users/' + userId).on('value', snap => {
      console.log('snap', snap)
      this.setState({ user: Object.values(snap.val())[0] })
    })
    console.log('user', this.state.user)
  }

  render() {
    console.log('user', this.state.user)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../assets/images/components/account.png')} 
            style={styles.userImage}
          />
          <View style={styles.textBox}>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <View style={styles.birthday}>
              <Icon name="envelope" color="purple" size={20}/>
              <Text style={styles.birthdayText}>{this.state.user.email}</Text>
            </View>
            <View style={styles.birthday}>
              <Icon name="birthday-cake" color="purple" size={20}/>
              <Text style={styles.birthdayText}>
                { this.state.user.date !== '' ? 
                  moment(this.state.user.date).locale('en-gb').format('LL') 
                : 
                  '-----'
                }
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>Status:</Text>
          <Text>
            {this.state.user.status}
          </Text>
        </View>
        <View style={styles.choicesBox}>
          <ProfileChoice 
            iconType="edit"
            title="Edit Profile"
            desc="Edit name and profile picture"
            onPress={() => this.props.navigation.navigate('EditProfile')}
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
    fontSize: 15
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
  },
  birthday: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  birthdayText: {
    marginLeft: 10
  }
})