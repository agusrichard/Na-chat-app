import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { auth, db, storage } from '../../config/Firebase'
import TextInputEditProfile from '../../components/TextInputEditProfile'
import CustomDatePicker from '../../components/CustomDatePicker'
import EditProfileButton from '../../components/EditProfileButton'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      user: {},
      name: '',
      status: '',
      date: '',
      filePath: ''
    }
  }

  handleSubmit = () => {
    console.log('submit')
    const { name, status, date, user } = this.state
    const userId = auth.currentUser.uid
    var key = ''
    db.ref('users/' + userId).once('value', snap => {
      console.log('snap key', Object.keys(snap.val())[0])
      key = Object.keys(snap.val())[0]
      const user = Object.values(snap.val())[0]
      console.log('user', user)
    })
    var updates = {};
    updates['/users/' + userId + '/' + key] = { 
      ...user, 
      name: name !== '' ? name : user.name, 
      status: status !== '' ? status : user.status,
      date: date !== '' ? date : user.date
    };
    db.ref().update(updates)
    this.props.navigation.navigate('Profile')
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log('source', source.fileName)
        this.setState({
          filePath: source,
        });
      }
    });
  };

  componentDidMount() {
    const userId = auth.currentUser.uid
    console.log('userId', userId)
    db.ref('users/' + userId).once('value', snap => {
      console.log('snap', snap)
      this.setState({ 
        user: Object.values(snap.val())[0]
      })
    })
    console.log('user', this.state.user)
  }

  componentWillUnmount() {
    db.ref('users').off()
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => this.chooseFile()} style={{ alignItems: 'center' }}>
          <Image 
            source={this.state.filePath !== '' ? this.state.filePath : require('../../assets/images/components/account.png')} 
            style={styles.userImage}
          />
          <Icon name="images"size={20} style={styles.imagePicker} color="purple"/>
        </TouchableOpacity>
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
          date={this.state.user.date}
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
  },
  imagePicker: {
    marginTop: -50, 
    borderColor: '#999', 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 3,
    marginRight: -65,
    backgroundColor: '#fff'
  }
})