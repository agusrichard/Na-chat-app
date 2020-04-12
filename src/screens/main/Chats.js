import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../../config/Firebase'
import { View, Text, TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation';

export default class Chats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.user = auth.currentUser
    this.friend = this.props.route.params.friend
    this.chatRef = db.ref('messages/' + this.generateChatId())
    this.chatRefData = this.chatRef.orderByChild('order')
  }

  generateChatId = () => {
    if (this.user.uid > this.friend.uid) {
      return `${this.user.uid}-${this.friend.uid}`
    } else {
      return `${this.friend.uid}-${this.user.uid}`
    }
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
    console.log('messages', messages)
    messages.forEach(message => {
      var now = new Date().getTime()
      Geolocation.getCurrentPosition(info => {
        this.chatRef.push({
          _id: now,
          text: message.text,
          createdAt: now,
          sender: this.user.uid,
          receiver: this.friend.uid,
          order: -1 * now,
          coords: info.coords
        })
        var updates = {};
        updates['/users/' + this.user.uid + '/coords'] = info.coords;
        db.ref().update(updates)
      });
    })
  }

  componentDidMount() {
    this.listenForChats(this.chatRefData)
  }

  componentWillUnmount() {
    this.chatRef.off()
  }

  render() {
    Geolocation.getCurrentPosition(info => {
      console.log('latitude', info.coords.latitude)
      console.log('longitude', info.coords.longitude)
    });
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