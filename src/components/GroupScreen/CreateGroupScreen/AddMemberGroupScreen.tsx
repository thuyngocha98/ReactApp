import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import { connect } from 'react-redux';
import styles from '../../../styles/GroupsStyles/CreateGroupScreenStyles/AddMemberGroupScreenStyles';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import { screenWidth } from '../../../constants/Dimensions';
import ModalNotification from '../../components/ModalNotification';
import ModalLoading from '../../components/ModalLoading';

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
  modalNotification?: {
    modalVisible?: boolean;
    type?: string;
    title?: string;
    description?: string;
    onPress?: () => void;
  };
};
class AddMemberGroupScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };
  emailTextInput: TextInput;
  timeout?: any;

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
      modalNotification: {
        modalVisible: false,
        type: 'success',
        title: '',
        description: '',
        onPress: () => {},
      },
    };
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
    Keyboard.dismiss();
    this.setState({ dataUserExist: [] });
    if (name === '' || email === '') {
      this.setState({
        modalNotification: {
          type: 'error',
          title: 'Bạn chưa điền thông tin',
          description: 'Vui lòng nhập đầy đủ thông tin.',
          modalVisible: true,
        },
      });
    } else {
      let check = this.state.data.some((item, i) => {
        if (item.name === name || item.email === email) {
          return true;
        }
      });
      if (check) {
        this.setState({
          modalNotification: {
            type: 'error',
            title: 'Tên hoặc Email đã tồn tại',
            description: 'Vui lòng kiểm tra lại.',
            modalVisible: true,
          },
        });
      } else {
        if (this.validateEmail(email)) {
          let newData = [...this.state.data, { name: name, email: email, isCustom: false }];
          this.setState({
            data: newData,
            email: '',
            name: '',
          });
        } else {
          this.setState({
            modalNotification: {
              type: 'error',
              title: 'Email không hợp lệ',
              description: 'Vui lòng kiểm tra lại.',
              modalVisible: true,
            },
          });
        }
      }
    }
  }

  createTrip = async () => {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    let newData = [];
    this.state.data.forEach((element) => {
      if (element.email === this.state.idLeader)
        newData.push({ name: element.name, email: element.email, isCustom: true });
      else newData.push(element);
    });
    const data = {
      name: this.props.navigation.getParam('nameGroup', 'No name'),
      startDay: this.props.navigation.getParam('startDay', '0-0-0000'),
      endDay: this.props.navigation.getParam('endDay', '0-0-0000'),
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
          this.setState({
            modalNotification: {
              type: 'error',
              title: res.error,
              description: 'Vui lòng kiểm tra lại.',
              modalVisible: true,
            },
          });
        } else {
          this.setState({ isLoading: false });
          this.props.navigation.navigate('GroupScreen');
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        alert(error);
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
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (text.indexOf('@') > -1 && text[text.length - 1] === '@') {
        this.checkUserExist(text);
      }
    }, 300); // await 0.3s after stop input then call api
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
        alert(error);
      });
  };

  renderListUserSearch = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.addEmailToList(item.name, item.email), this.setState({ showUserExists: false });
        }}
      >
        <View style={styles.userExists}>
          <Text style={styles.username}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <>
        <ModalNotification
          type={this.state.modalNotification.type}
          modalVisible={this.state.modalNotification.modalVisible}
          title={this.state.modalNotification.title}
          description={this.state.modalNotification.description}
          txtButton="Ok"
          onPress={() => this.setState({ modalNotification: { modalVisible: false } })}
        />
        <View style={styles.container}>
          <ModalLoading isVisible={this.state.isLoading} />
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
          <View style={styles.viewHeader}>
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
                <Text style={styles.next}>Xong</Text>
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
            <View style={styles.viewBtn}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => {
                  this.addEmailToList(this.state.name, this.state.email);
                }}
              >
                <Text style={styles.txtAddMember}>Thêm thành viên</Text>
              </TouchableOpacity>
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
          {this.state.showUserExists ? (
            <View style={styles.popupList}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                removeClippedSubviews={true}
                initialNumToRender={4}
                data={this.state.dataUserExist}
                renderItem={this.renderListUserSearch}
                keyExtractor={(item) => item._id.toString()}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  }
}

export default connect(mapStateToProps)(AddMemberGroupScreen);
