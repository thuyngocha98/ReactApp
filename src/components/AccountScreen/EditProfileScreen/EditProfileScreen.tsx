import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image, Keyboard, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth, APPBAR_HEIGHT, screenHeight } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../../../actions/action';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { thumbnails } from '../../../constants/FunctionCommon';
import * as Permissions from 'expo-permissions';
import { BASEURL } from '../../../api/api';
import ModalNotification from '../../components/ModalNotification';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
  getDataUser?: any;
};

type States = {
  name?: string;
  email?: string;
  // imageToBase64?: string;
  image?: any;
  modalNotification?: {
    modalVisible?: boolean,
    type?: string,
    title?: string,
    description?: string,
    onPress?: () => void;
  },
};

class EditProfileScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name', 'Your Name'),
      email: this.props.navigation.getParam('email', 'youremail@gmail.com'),
      // imageToBase64: '',
      image: null,
      modalNotification: {
        modalVisible: false,
        type: 'success',
        title: '',
        description: '',
        onPress: () => {}
      },
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  editProfile(userId, nameOrg) {
    Keyboard.dismiss();
    if(nameOrg !== this.state.name || this.state.image){
      const name = this.state.name;
      const email = this.state.email;
      if (!this.validateEmail(email)) {
        this.setState({modalNotification: {
          type: 'error',
          title: 'Email không hợp lệ!',
          description: 'Vui lòng kiểm tra lại email của bạn.',
          modalVisible: true,
        }})
      } else {
        if (name.length < 2) {
          this.setState({modalNotification: {
            type: 'error',
            title: 'Tên người dùng không hợp lệ!',
            description: 'Tên người dùng phải có ít nhất 2 kí tự.',
            modalVisible: true,
          }})
        } else {
          let bodyFormData = new FormData();
          if (!this.state.image) {
            bodyFormData.append('name', name);
            bodyFormData.append('isCheck', '0');
            bodyFormData.append('email', email);
          } else {
            let photo = {
              uri: this.state.image.url,
              name: this.state.image.name,
              type: this.state.image.type,
            };
  
            bodyFormData.append('image', photo);
            bodyFormData.append('isCheck', '1');
            bodyFormData.append('name', name);
            bodyFormData.append('email', email);
          }
          fetch(`${BASEURL}/api/user/update_a_user/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: bodyFormData,
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.result == 'ok') {
                this.getDataUserForRedux();
              }
              this.setState({modalNotification: {
                type: 'success',
                title: 'Cập nhật thành công.',
                description: 'Bạn đã cập nhật thông tin thành công',
                modalVisible: true,
              }})
            })
            .catch((error) => {
              alert(error);
            });
        }
      }
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        this.setState({modalNotification: {
          type: 'error',
          title: 'Xin quyền không thành công',
          description: 'Xin lỗi, chúng tôi cần quyền sử dụng camera để tiếp tục',
          modalVisible: true,
        }})
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let image = {
        url: localUri,
        name: filename,
        type,
      };
      this.setState({ image: image });
    }
  };

  async getDataUserForRedux() {
    await this.props.getDataUser();
  }

  render() {
    const name = this.props.navigation.getParam('name', 'Your Name');
    const email = this.props.navigation.getParam('email', 'youremail@gmail.com');
    const avatar = this.props.navigation.getParam('avatar', '');
    const userId = this.props.navigation.getParam('userId', '');
    const thumbnail =
      avatar.length > 2 ? { uri: `${BASEURL}/images/avatars/${avatar}` } : thumbnails['avatar' + avatar];
    return (
      <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({modalNotification: {modalVisible: false}})}
        />
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.cancel}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons name='md-arrow-back' size={28} color={Colors.white} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.addContact}>Chỉnh sửa thông tin</Text>
            <View style={styles.save} />
          </View>
        </View>
        <View style={styles.background1} />
        <View style={styles.background2}>
          <View style={styles.sectionName}>
            <View style={styles.viewName}>
              <Text style={styles.name}>Tên</Text>
            </View>
            <View style={styles.inputName}>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  this.setState({
                    name: text,
                  })
                }
                placeholder={name}
                autoCapitalize={'words'}
                returnKeyType={'next'}
                keyboardType="default"
                autoCorrect={false}
                placeholderTextColor={Colors.lightgray}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
            </View>
            <View style={{ height: 0.5, width: screenWidth - 74, marginLeft: 37, backgroundColor: Colors.gray }} />
          </View>
          <View style={styles.sectionName}>
            <View style={styles.viewName1}>
              <Text style={styles.name}>Email</Text>
            </View>
            <View style={styles.inputName}>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder={email}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                keyboardType="email-address"
                autoCorrect={false}
                placeholderTextColor={Colors.lightgray}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
            </View>
            <View style={{ height: 0.5, width: screenWidth - 74, marginLeft: 37, backgroundColor: Colors.gray }} />
          </View>
          <TouchableOpacity
            style={styles.btnDone}
            onPress={() => {
              this.editProfile(userId, name);
            }}
          >
            <Text style={styles.txtDone}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.absoluteImage}>
          <TouchableOpacity onPress={this._pickImage} activeOpacity={0.6}>
            <Image
              style={styles.avatar}
              source={this.state.image ? { uri: this.state.image.url } : thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.txtGuide}>Bấm vào ảnh để thay đổi ảnh đại diện</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + Constants.statusBarHeight,
    backgroundColor: Colors.tabIconSelected
  },
  header: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addContact: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  cancel: {
    paddingLeft: screenWidth/27,
    paddingRight: screenWidth/24,
    paddingVertical: screenWidth/72,
  },
  save: {
    paddingRight: screenWidth/27,
    paddingLeft: screenWidth/27,
    paddingVertical: screenWidth/72,
  },
  imageHeader: {

  },
  background1: {
    height: screenHeight/8,
    width: screenWidth,
    backgroundColor: Colors.lavender,
  },
  background2: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  absoluteImage: {
    position: 'absolute',
    top: APPBAR_HEIGHT + Constants.statusBarHeight+ screenHeight/28,
    left: screenWidth/2 - screenHeight/10.8,
    width: screenHeight/5.6,
    height: screenHeight/5.6,
    borderRadius: screenHeight/10.8,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.mediumseagreen,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  avatar: {
    width: screenHeight/5.6 - screenHeight/140,
    height: screenHeight/5.6 - screenHeight/140,
    borderRadius: screenHeight/10.8 - screenHeight/280,
  },
  sectionName: {
    flexDirection: 'column',
    marginVertical: screenHeight/56,
  },
  viewName: {
    marginTop: screenHeight/14,
    marginHorizontal: screenWidth/18,
  },
  viewName1: {
    marginTop: screenHeight/108,
    marginHorizontal: screenWidth/18,
  },
  name: {
    fontSize: 16,
    color: Colors.tintColor,
  },
  input: {
    fontSize: 16,
  },
  inputName: {
    marginHorizontal: screenWidth/9,
    marginVertical: screenHeight/70,
  },
  btnDone: {
    marginTop: screenHeight/28,
    marginHorizontal: screenWidth/12,
    borderRadius: 8,
    backgroundColor: Colors.tintColor,
  },
  txtDone: {
    textAlign: 'center',
    paddingVertical: screenHeight/40,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '400',
  },
  txtGuide: {
    position: 'absolute',
    top:  APPBAR_HEIGHT + Constants.statusBarHeight,
    textAlign: 'center',
    left: 0,
    right: 0,
    fontSize: 12,
    color: Colors.gray
  }
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDataUser: getApiDataUser,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
