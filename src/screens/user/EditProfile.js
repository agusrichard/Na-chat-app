import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { auth, db } from '../../config/Firebase'
import TextInputEditProfile from '../../components/TextInputEditProfile'
import CustomDatePicker from '../../components/CustomDatePicker'
import EditProfileButton from '../../components/EditProfileButton'

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      user: {},
      name: '',
      status: '',
      date: ''
    }
  }

  handleSubmit = () => {
    console.log('submit')
    const { name, status, date } = this.state
    const userId = auth.currentUser.uid
    db.ref('users/' + userId).on('value', snap => {
      console.log('snap key', Object.keys(snap.val())[0])
      const user = Object.values(snap.val())[0]
      console.log('user', user)
      var updates = {};
      updates['/users/' + userId + '/' + Object.keys(snap.val())[0]] = { ...user, name, status, date };
      db.ref().update(updates)
    })
    this.props.navigation.navigate('Profile')
  }

  componentDidMount() {
    const userId = auth.currentUser.uid
    console.log('userId', userId)
    db.ref('users/' + userId).on('value', snap => {
      console.log('snap', snap)
      this.setState({ 
        user: Object.values(snap.val())[0]
      })
    })
    console.log('user', this.state.user)
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
          source={require('../../assets/images/components/account.png')} 
          style={styles.userImage}
        />
        <TextInputEditProfile 
          placeholder={this.state.user.name}
          icon="signature"
          handleChange={(name) => this.setState({name})}
        />
        <TextInputEditProfile 
          placeholder={this.state.user.status !== undefined ? this.state.user.status : 'Hi... I am using "Na?"'}
          icon="paragraph"
          handleChange={(status) => this.setState({status})}
        />
        <CustomDatePicker 
          date={this.state.date}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <EditProfileButton 
          title="Edit"
          onPress={() => this.handleSubmit()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  userImage: {
    height: 100,
    width: 100,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginBottom: 20
  }
})