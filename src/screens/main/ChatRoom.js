import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import ChatCard from '../../components/ChatCard'
import { db, auth } from '../../config/Firebase'

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chats: []
    }
    this.chatsRef = db.ref('messages')
  }

  listenForChats = (ref) => {
    ref.on('value', snap => {
      console.log('\n')
      console.log('In ChatRoom.js snap', snap.val())
      var items = []
      snap.forEach(item => {
        console.log('item key', item.key)
        if (item.key.split('-').includes(auth.currentUser.uid)) {
          console.log('this is my chats')
          console.log('item.val', Object.values(item.val())[Object.values(item.val()).length - 1])
          var lastChat = Object.values(item.val())[Object.values(item.val()).length - 1]
          if (lastChat != undefined) {
            var receiverId = lastChat.receiver
            var text = lastChat.text
            db.ref('users/' + receiverId).on('value', snap => {
              const user = snap.val()
              items.push({ user: user, text: text })
            })
          }
        }
      })

      console.log('items users', items)
      // snap.forEach(item => {
      //   console.log('item', item.val())
      //   if (item.key.split('-').includes(auth.currentUser.uid)) {
      //     console.log('true')
      //     console.log('item', Object.values(item.val()).filter(item => item.uid !== auth.currentUser.uid))
      //     var filtered = Object.values(item.val()).filter(item => item.uid !== auth.currentUser.uid)
      //     console.log(filtered[filtered.length - 1])
      //     if (filtered[filtered.length - 1] != undefined) {
      //       var userId = filtered[filtered.length - 1].uid
      //       var text = filtered[filtered.length - 1].text
      //       db.ref('users/' + userId).on('value', snap => {
      //         const user = snap.val()
      //         items.push({ user: user, text: text })
      //       })
      //     }
      //   }
      // })
      // console.log('items', items)
      this.setState({ chats: items })
    })
  }

  componentDidMount() {
    this.listenForChats(this.chatsRef)
  }

  componentWillUnmount() {
    this.chatsRef.off()
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        { this.state.chats.length !== 0 ?
          this.state.chats.map((chat, i) => (
            <ChatCard key={i} chat={chat} onPress={() => this.props.navigation.navigate('Chats', { friend: { uid: chat.userId } })}/>
          )) :
          <Text style={styles.text}>No Chats</Text>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18
  }
})