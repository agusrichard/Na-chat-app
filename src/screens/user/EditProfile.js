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
      isLoading: false,
      user: {},
      name: '',
      status: '',
      date: '',
      fileName: '',
      fileType: '',
      fileUri: '',
      filePath: ''
    }
  }

  handleSubmit = () => {
    this.setState({ isLoading: true })
    console.log('submit')
    const userId = this.state.user.uid
    const { name, status, date, user, fileName } = this.state
    if (this.state.fileUri) {
      this.uriToBlob(this.state.fileUri)
        .then((blob)=>{
        return this.uploadToFirebase(blob);
      }).then((snapshot)=>{
        console.log("File uploaded");
        var updates = {};
        updates['users/' + userId] = { 
          ...user, 
          name: name !== '' ? name : user.name, 
          status: status !== '' ? status : user.status,
          date: date !== '' ? date : user.date,
          image: fileName
        };
        db.ref().update(updates)
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Profile')
      }).catch((error)=>{
        this.setState({ isLoading: false })
        throw error;
      })
    } else {
      var updates = {};
        updates['users/' + userId] = { 
          ...user, 
          name: name !== '' ? name : user.name, 
          status: status !== '' ? status : user.status,
          date: date !== '' ? date : user.date,
        };
        db.ref().update(updates)
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Profile')
    }
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
          fileName: source.fileName,
          fileType: source.type,
          fileUri: source.uri
        });
      }
    });
  };

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  uploadToFirebase = (blob) => {
    return new Promise((resolve, reject)=>{
      var storageRef = storage.ref();
      storageRef.child('uploads/' + this.state.fileName).put(blob, {
        contentType: this.state.fileType
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  componentDidMount() {
    const userId = auth.currentUser.uid
    console.log('userId', userId)
    db.ref('users/' + userId).on('value', snap =>{
      const user = snap.val()
      if (user.image) {
        console.log('user has image')
        storage.ref('uploads/' + user.image).getDownloadURL()
          .then(url => {
            console.log('image url', url)
            this.setState({
              user: {
                ...user,
                imageUrl: url
              }
            })
          })
      } else {
        this.setState({ 
          user: user
        })
      }
    })
  }

  componentWillUnmount() {
    db.ref('users').off()
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => this.chooseFile()} style={{ alignItems: 'center' }}>
          <Image 
            source={
              this.state.filePath === '' ?
              this.state.user.imageUrl ? 
              {uri: this.state.user.imageUrl}
              : 
              require('../../assets/images/components/account.png')
              : 
              this.state.filePath} 
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
          placeholder={this.state.user.status}
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
          isLoading={this.state.isLoading}
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