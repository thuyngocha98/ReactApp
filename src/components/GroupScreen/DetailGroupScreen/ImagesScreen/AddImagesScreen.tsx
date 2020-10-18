import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Button, Image, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../../../../constants/Colors';
import { screenWidth, APPBAR_HEIGHT } from '../../../../constants/Dimensions';
import * as ImagePicker from 'expo-image-picker';
import { BASEURL } from '../../../../api/api';
import { Video } from 'expo-av';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  image: any;
  imageToBase64: string;
  uriVideo: any;
};

class AddImagesScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  state = {
    image: null,
    imageToBase64: '',
    uriVideo: '',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    await this.setState({
      imageToBase64: result.base64,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    await this.setState({
      uriVideo: result,
    });
  };

  upload = async (tripId) => {
    if (this.state.image) {
      if (this.state.imageToBase64 == '') {
        ToastAndroid.showWithGravityAndOffset(
          'upload fail, please upload again',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        const data = {
          imageBase64: this.state.imageToBase64,
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/trip/upload_image/${tripId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: json,
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data == 'done') {
              ToastAndroid.showWithGravityAndOffset('upload done', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
              this.props.navigation.navigate('ShowImagesScreen');
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'upload fail, please upload again',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      let formData = new FormData();
      formData.append('video', {
        name: 'name',
        uri: this.state.uriVideo.uri,
        type: `video/${this.state.uriVideo.type}`,
      });

      try {
        let response = await fetch(`${BASEURL}/api/trip/upload_video`, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        ToastAndroid.showWithGravityAndOffset('upload done', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        this.props.navigation.navigate('ShowImagesScreen');
      } catch (error) {
        console.log('error : ' + error);
        return error;
      }
    }
  };
  render() {
    const tripId = this.props.navigation.getParam('tripId', '');
    let { image } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.cancel}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={styles.textHeaderLeft}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.addContact}>Choose Media</Text>
            <TouchableOpacity
              style={styles.save}
              activeOpacity={0.5}
              onPress={() => {
                this.upload(tripId);
              }}
            >
              <Text style={styles.add}>Choose</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
            <Button title="Pick an image from camera roll" onPress={this._pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5 }} />}
          </View>
          <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Button title="Pick an video from camera roll" onPress={this._pickVideo} />
            {!this.state.uriVideo.cancelled && (
              <Video
                source={{ uri: this.state.uriVideo.uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping={false}
                style={{ width: 200, height: 200, marginTop: 5 }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + StatusBar.currentHeight,
    backgroundColor: Colors.tabIconSelected,
  },
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: screenWidth / 27.43,
  },
  addContact: {
    flex: 5,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  cancel: {
    flex: 2,
  },
  add: {
    fontSize: 17,
    color: Colors.white,
  },
  save: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textHeaderLeft: {
    fontSize: 17,
    color: Colors.white,
  },
});

export default connect(mapStateToProps)(AddImagesScreen);
