import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../../config/Firebase'
import { View, Text, TouchableOpacity } from 'react-native'

export default class Chats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.user = auth.currentUser
    this.chatRef = db.ref('messages')
    this.chatRefData = this.chatRef.orderByChild('order')
  }

  listenForChats(chatRef) {
    chatRef.on('value', (snap) => {
      let items = []
      snap.forEach(item => {
        items.push({
          _id: item.val().createdAt,
          text: item.val().text,
          createdAt: new Date(item.val().createdAt),
          user: {
            _id: item.val().uid
          }
        })
      })
      this.setState({
        messages: items
      })
    })
  }

  onSend = (messages = []) => {
    messages.forEach(message => {
      var now = new Date().getTime()
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        order: -1 * now
      })
    })
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  componentDidMount() {
    this.listenForChats(this.chatRefData)
  }

  componentWillUnmount() {
    this.chatRef.off()
  }

  render() {
    console.log('messages', this.state.messages)
    return (
      <GiftedChat 
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.user.uid
        }}
      />
    )
  }
}