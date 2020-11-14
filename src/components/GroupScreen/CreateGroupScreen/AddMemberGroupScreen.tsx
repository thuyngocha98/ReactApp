import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';
import { connect } from 'react-redux';
import styles from '../../../styles/GroupsStyles/CreateGroupScreenStyles/AddMemberGroupScreenStyles';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import DialogBox from 'react-native-dialogbox';
import { screenWidth } from '../../../constants/Dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';

function mapStateToProps(state) {
  return {
    user_id: state.dataUser.dataUser._id,
    user: state.dataUser.dataUser,
  };
}

type Props = {
  navigation?: any;
  user_id?: string;
  user?: {
    name?: string;
    email?: string;
  };
};

type States = {
  dataUserExist?: any[];
  data?: any[];
  email?: string;
  name?: string;
  showUserExists?: boolean;
  idLeader?: string;
  isLoading?: boolean;
};
class AddMemberGroupScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };
  emailTextInput: TextInput;
  dialogbox: any;

  constructor(props) {
    super(props);
    this.state = {
      dataUserExist: [],
      data: [{ name: this.props.user.name, email: this.props.user.email, isCustom: false }],
      email: '',
      name: '',
      showUserExists: false,
      idLeader: this.props.user.email,
      isLoading: false,
    };
  }

  handleOnPress(title, content) {
    Keyboard.dismiss();
    // alert
    this.dialogbox.tip({
      title: title,
      content: content,
      btn: {
        text: 'OK',
        style: { fontWeight: '500', fontSize: 20, color: '#044de0' },
      },
    });
  }

  goBackFriendsScreen = () => {
    this.props.navigation.goBack();
  };

  deleteEmailFromList(email) {
    let newData = this.state.data.filter(function (obj) {
      return obj.email !== email;
    });
    this.setState({
      data: newData,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  addEmailToList(name, email) {
    this.setState({ dataUserExist: [] });
    if (name === '' || email === '') {
      this.handleOnPress('Error!', ['Information missing!!!', 'Please enter full infomation..']);
    } else {
      let check = this.state.data.some((item, i) => {
        if (item.name === name || item.email === email) {
          return true;
        }
      });
      if (check) {
        this.handleOnPress('Error!', ['Name or Email already exists!', 'Please check again.']);
      } else {
        if (this.validateEmail(email)) {
          let newData = [...this.state.data, { name: name, email: email, isCustom: false }];
          this.setState({
            data: newData,
            email: '',
            name: '',
          });
        } else {
          this.handleOnPress('Error!', ['Email invalid!', 'Please check again.']);
        }
      }
    }
  }

  createTrip = async () => {
    this.setState({ isLoading: true });
    let newData = [];
    this.state.data.forEach((element) => {
      if (element.email === this.state.idLeader)
        newData.push({ name: element.name, email: element.email, isCustom: true });
      else newData.push(element);
    });
    const data = {
      name: this.props.navigation.getParam('nameGroup', 'No name'),
      // startDay: this.props.navigation.getParam('startDay', '0-0-0000'),
      // endDay: this.props.navigation.getParam('endDay', '0-0-0000'),
      author: this.props.user_id,
      list_user: newData,
      listPlan: this.props.navigation.getParam('listPlan', []),
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/trip/insert_new_trip`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          this.setState({ isLoading: false });
          Keyboard.dismiss();
          this.dialogbox.tip({
            title: 'Error!',
            content: [res.error, 'Please enter another group name.'],
            btn: {
              text: 'OK',
              style: { fontWeight: '500', fontSize: 20, color: '#044de0' },
              callback: () => {
                this.props.navigation.navigate('CreateGroupScreen');
              },
            },
          });
        } else {
          this.setState({ isLoading: false });
          Keyboard.dismiss();
          this.props.navigation.navigate('GroupScreen');
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  listenerInputEmail(text) {
    if (text.length <= 2) this.setState({ showUserExists: false });
    else if (this.state.dataUserExist.length > 0) {
      if (this.state.dataUserExist[0].email.indexOf(text) < 0) {
        this.setState({ showUserExists: false });
      } else this.setState({ showUserExists: true });
    }

    this.setState({ email: text });
    if (text.indexOf('@') > -1 && text[text.length - 1] === '@') {
      this.checkUserExist(text);
    }
  }

  checkUserExist = async (email) => {
    const data = {
      email: email,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/user/check_user_exists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          dataUserExist: res.data,
        });
        if (res.data.length > 0)
          this.setState({
            showUserExists: true,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={{ zIndex: 10, backgroundColor: Colors.tabIconSelected }}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.goBackFriendsScreen}>
              <Text style={styles.cancel}>Hủy</Text>
            </TouchableOpacity>
            <Text style={styles.addFriends}>Thên thành viên</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.createTrip();
              }}
            >
              <Text style={styles.next}>Kết thúc</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <View style={styles.iconSearch}>
              <MaterialCommunityIcons name="email" size={25} color={Colors.gray} />
            </View>
            <TextInput
              style={{ flex: 8 }}
              keyboardType="email-address"
              onChangeText={(text) => this.listenerInputEmail(text)}
              onSubmitEditing={() => {
                this.emailTextInput.focus();
              }}
              value={this.state.email}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              placeholder={'Email thành viên...'}
              autoFocus
            />
            <View style={{ flex: 1 }} />
          </View>
          <View style={styles.input1}>
            <View style={styles.iconSearch}>
              <FontAwesome name="user" size={25} color={Colors.gray} />
            </View>
            <TextInput
              style={{ flex: 8 }}
              keyboardType="visible-password"
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
              ref={(input) => {
                this.emailTextInput = input;
              }}
              blurOnSubmit={false}
              autoCorrect={false}
              autoCapitalize={'words'}
              placeholder={'Tên thành viên...'}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                this.addEmailToList(this.state.name, this.state.email);
              }}
            >
              <Text style={{ color: 'rgba(128,128,128,0.8)', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
                Thêm thành viên
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popuplist}>
            {this.state.showUserExists ? (
              <FlatList
                scrollEnabled
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                data={this.state.dataUserExist}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPressIn={() => {
                      this.addEmailToList(item.name, item.email), this.setState({ showUserExists: false });
                    }}
                  >
                    <View style={styles.userExists}>
                      <Text style={styles.username}>{item.name}</Text>
                      <Text style={styles.email}>{item.email}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id.toString()}
              />
            ) : null}
          </View>
        </View>
        {this.state.data?.length > 1 && (
          <Text style={styles.txtChooseLeader}>Chọn một trưởng nhóm cho nhóm của bạn, mặc định sẽ là bạn</Text>
        )}
        <View style={styles.viewContent}>
          <FlatList
            scrollEnabled
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={this.state.data}
            renderItem={({ item }) => (
              <View style={styles.viewEmail}>
                <View style={styles.nameAndMail}>
                  <Text style={styles.textName}>{item.name}</Text>
                  <Text style={styles.textEmail}>{item.email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ marginRight: screenWidth / 40 }}
                    onPress={() => this.setState({ idLeader: item.email })}
                  >
                    <MaterialCommunityIcons
                      name="crown"
                      size={25}
                      color={this.state.idLeader == item.email ? Colors.tintColor : Colors.gray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ opacity: item.email !== this.props.user.email ? 1 : 0.05 }}
                    onPress={() => {
                      item.email !== this.props.user.email && this.deleteEmailFromList(item.email);
                    }}
                  >
                    <Feather name="delete" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.email}
          />
        </View>
        {this.state.isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator animating size="large" color={Colors.tintColor} />
          </View>
        ) : null}
        <DialogBox
          ref={(dialogbox) => {
            this.dialogbox = dialogbox;
          }}
          isOverlayClickClose={false}
          style={{ zIndex: 20, backgroundColor: '#333' }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(AddMemberGroupScreen);
