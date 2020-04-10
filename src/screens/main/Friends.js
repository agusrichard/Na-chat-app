import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import UserCard from '../../components/UserCard'
import { auth, db } from '../../config/Firebase'

export default class Friends extends React.Component {

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
      let items = []
      snap.forEach(item => {
        if (this.user.uid !== item.val().uid) {
          items.push(item.val())
        }
      })

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
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          { this.state.users.map((user, i) => (
            <UserCard user={user} key={i} onPress={() => this.props.navigation.navigate('Chats', { friend: user })} />
          )) }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 25
  }
})