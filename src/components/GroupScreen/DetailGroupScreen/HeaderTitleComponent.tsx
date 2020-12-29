import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ImageBackground, Alert, Platform, Dimensions } from 'react-native';
import HeaderTitleComponentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/HeaderTitleComponentStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenWidth } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { BASEURL } from '../../../api/api';
import { number2money } from '../../../constants/FunctionCommon';
import DialogInput from 'react-native-dialog-input';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

function mapStateToProps(state) {
  return {
    userId: state.dataUser.dataUser._id,
  };
}

type Props = {
  userId?: any;
  itemSelected?: number;
  navigation?: any;
  nameGroup?: string;
  idGroup?: string;
  time?: string;
  amount?: number;
  startDay?: string;
  endDay?: string;
  dataTrip?: any;
  onPress?: (_: boolean) => void;
};

type States = {
  itemSelected?: any;
  opened?: boolean;
  isDialogVisible?: boolean;
  nameGroup?: any;
  image?: any;
};

class HeaderTitleComponent extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: 0,
      opened: false,
      isDialogVisible: false,
      nameGroup: '',
      image: null,
    };
  }

  data = [
    {
      id: 0,
      title: 'Overview',
    },
    {
      id: 1,
      title: 'Balances',
    },
    {
      id: 4,
      title: 'Chat',
    },

    {
      id: 5,
      title: 'See the schedule of the trip',
    },
    {
      id: 6,
      title: 'Picture Memories',
    },
    {
      id: 7,
      title: 'Plan Trip',
    },
  ];
  // click icon setting => open menu
  onTriggerPress() {
    this.setState({ opened: true });
  }
  // close menu when click outside view menu
  onBackdropPress() {
    this.setState({ opened: false });
  }
  editGroup = () => {
    this.setState({
      opened: !this.state.opened,
      isDialogVisible: !this.state.isDialogVisible,
    });
  };

  changeNameGroup = async (text) => {
    if (text.length >= 2) {
      await this.setState({
        nameGroup: text,
        isDialogVisible: !this.state.isDialogVisible,
      });
      this.callApiChangeNameGroup();
    } else {
      alert('Tên nhóm phải có ít nhất 2 kí tự !');
    }
  };

  callApiChangeNameGroup = async () => {
    let data = await {
      name: this.state.nameGroup,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/trip/update_a_trip/${this.props.idGroup}/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result == 'Failed') {
          Alert.alert(res.message);
        } else {
          Alert.alert(
            res.message,
            '',
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  // function delete group
  removeGroup = () => {
    this.setState({ opened: false });
    this.props.onPress(true);
  };

  hideDialogInput = () => {
    this.setState({
      isDialogVisible: !this.state.isDialogVisible,
    });
  };

  imageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let image = {
        uri: localUri,
        name: filename,
        type,
      };
      this.setState({
        image,
      });
      this.saveImagePhoto();
    }
  };

  takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let image = {
        uri: localUri,
        name: filename,
        type,
      };
      this.setState({
        image,
      });
      this.saveImagePhoto();
    }
  };

  saveImagePhoto = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append('image', this.state.image);
    bodyFormData.append('tripId', this.props.dataTrip._id);
    await fetch(`${BASEURL}/api/trip/change_avatar_group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyFormData,
    })
      .then((response) => response.json())
      .then((res) => {})
      .catch((error) => {
        alert(error);
      });
    this.setState({
      image: null,
    });
  };

  camera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Xin lỗi, chúng tôi cần quyền sử dụng thư viện để hoạt động!');
    } else {
      Alert.alert(
        'Thay đổi ảnh đại diện nhóm',
        '',
        [
          {
            text: 'Truy cập thư viện',
            onPress: this.imageLibrary,
          },
          {
            text: 'Chụp ảnh',
            onPress: this.takePhoto,
          },
        ],
        { cancelable: true },
      );
    }
  };

  render() {
    const lengthAvatar = this.props.dataTrip.avatarGroup.length;
    const { navigation } = this.props;
    var time = this.props.time.split('-');
    const avatar =
      lengthAvatar > 2
        ? { uri: `${BASEURL}/images/avatarsGroup/${this.props.dataTrip.avatarGroup}` }
        : require('../../../../assets/images/icon_camera.png');
    return (
      <MenuProvider>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={'Chỉnh sửa nhóm'}
          message={'Nhập tên nhóm bạn muốn chỉnh sửa'}
          hintInput={'Nhập tên nhóm...'}
          submitInput={(inputText) => {
            this.changeNameGroup(inputText);
          }}
          closeDialog={this.hideDialogInput}
          modalStyle={
            Platform.OS === 'ios'
              ? { backgroundColor: 'rgba(0,0,0,0.9)', position: 'relative', top: -screenWidth / 3.5 }
              : ''
          }
        ></DialogInput>
        {/* view modal */}
        <View style={HeaderTitleComponentStyles.container}>
          <ImageBackground
            source={require('../../../../assets/images/backgroundDetailGroup.png')}
            style={HeaderTitleComponentStyles.backgroundImage}
          >
            <View style={HeaderTitleComponentStyles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View style={HeaderTitleComponentStyles.btnBack}>
                  <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.camera}>
                <Image
                  style={
                    this.state.image
                      ? HeaderTitleComponentStyles.iconCamera1
                      : lengthAvatar > 0
                      ? HeaderTitleComponentStyles.iconCamera1
                      : HeaderTitleComponentStyles.iconCamera
                  }
                  source={this.state.image ? { uri: this.state.image.uri } : avatar}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={HeaderTitleComponentStyles.btnSetting}>
                <Menu opened={this.state.opened} onBackdropPress={() => this.onBackdropPress()}>
                  <MenuTrigger
                    onPress={() => this.onTriggerPress()}
                    children={<Ionicons name="ios-settings" size={32} color={Colors.white} />}
                  />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption onSelect={this.editGroup}>
                      <Text style={{ color: '#ff9933' }}>Chỉnh sửa</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.removeGroup}>
                      <Text style={{ color: Colors.orangered }}>Xóa</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
            <View style={HeaderTitleComponentStyles.contentText}>
              <Text style={HeaderTitleComponentStyles.textTitle}>{this.props.nameGroup}</Text>
              <Text style={HeaderTitleComponentStyles.numberPeopleAndTime}>
                Bắt đầu {this.props.dataTrip.begin_date} - {this.props.dataTrip.end_date}
              </Text>
              <Text style={HeaderTitleComponentStyles.numberPeopleAndTime}>
                {this.props.dataTrip.membersTrip} thành viên tham gia
              </Text>
              <View style={HeaderTitleComponentStyles.owesAndMoney}>
                <Text style={HeaderTitleComponentStyles.owes}>
                  {this.props.amount >= 0 ? 'Bạn lấy lại : ' : 'Bạn nợ : '}
                </Text>
                <Text style={HeaderTitleComponentStyles.money}>
                  {this.props.amount >= 0 ? (
                    <Text style={{ color: Colors.mediumseagreen }}>{number2money(this.props.amount)} VND</Text>
                  ) : (
                    <Text style={{ color: Colors.orangered }}>{number2money(this.props.amount * -1)} VND</Text>
                  )}{' '}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </MenuProvider>
    );
  }
}

export default connect(mapStateToProps)(HeaderTitleComponent);

const optionsStyles = {
  optionsContainer: {
    backgroundColor: Colors.white,
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: Colors.white,
  },
  optionWrapper: {
    backgroundColor: Colors.white,
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: Colors.tintColor,
  },
};
