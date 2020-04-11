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
      console.log('friends snap', snap.val())
      let items = []
      snap.forEach(item => {
        console.log('item', Object.values(item.val())[0])
        if (this.user.uid !== Object.values(item.val())[0].uid) {
          items.push(Object.values(item.val())[0])
        }
      })

      console.log('items', items)

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
    console.log('users.length', this.state.users.length)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          { this.state.users.length === 0 ?
              <View >
                <Text style={{ textAlign: 'center', fontSize: 18 }} >No Friends</Text>
              </View>
            :

            this.state.users.map((user, i) => (
              <UserCard user={user} key={i} onPress={() => this.props.navigation.navigate('Chats', { friend: user })} />
            ))
          }
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