import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableOpacity, ScrollView, AsyncStorage, StatusBar } from 'react-native';
import styles from '../../styles/AccountScreenStyle/MainAccountScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BASEURL } from '../../api/api';

// @ts-ignore
import { thumbnails } from '../../constants/FunctionCommon';
import { screenWidth } from '../../constants/Dimensions';
import Colors from "../../constants/Colors";

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  navigation?: any;
  user?: {
    avatar: any;
    name: string;
    email: string;
    _id: string;
  };
};

type States = {
  isOverview?: boolean,
  isHelp?: boolean,
}

class MainAccountScreen extends Component<Props, States> {
  _navListener: any;

  state = {
    isOverview: false,
    isHelp: false,
  }

  componentDidMount() {
    //set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  signOut = () => {
    AsyncStorage.removeItem('jwt').then((r) => console.log(r));
    this.props.navigation.navigate('MainLoginScreen');
  };

  handleOverView = () => {
    this.setState({ isOverview: !this.state.isOverview })
  }

  handleHelp = () => {
    this.setState({ isHelp: !this.state.isHelp })
  }

  render() {
    const { isHelp, isOverview } = this.state;
    const thumbnail = this.props.user?.avatar &&
      this.props.user?.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${this.props.user?.avatar}` }
        : thumbnails['avatar' + this.props.user?.avatar];
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
          <View style={styles.header}>
            <Image source={thumbnail} style={styles.avatar} />
            <Text style={styles.textUser}>{this.props.user.name}</Text>
            <Text style={styles.email}>{this.props.user.email}</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={this.handleOverView} style={styles.viewItem}>
            <View style={styles.viewTxt}>
              <View style={styles.viewRow}>
                <View style={styles.viewIcon}>
                  <AntDesign name={'home'} size={25} color={'gray'}/>
                </View>
                <Text style={styles.txtItem}>
                  Tổng quan
                </Text>
                <AntDesign name={isOverview ? 'up' : 'down'} size={20} color={'gray'} style={{marginRight: screenWidth/36}} />
              </View>
              {isOverview &&
              <View style={styles.overView}>
                 <Text style={styles.txtTitle}>Wego</Text>
                 <Text style={styles.txtDesc}>
                   Là một ứng dụng miễn phí với nhiều tính năng hỗ trợ cho du lịch nhóm như tạo nhóm,
                   lên lịch trình, quản lý chi tiêu, chia sẻ vị trí, hình ảnh, ...
                 </Text>
              </View>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewItem}
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate('EditProfileScreen', {
                name: this.props.user.name,
                email: this.props.user.email,
                userId: this.props.user._id,
                avatar: this.props.user.avatar,
                navigation: this.props.navigation,
              });
            }}
          >
            <View style={styles.viewTxt}>
              <View style={styles.viewRow}>
                <View style={styles.viewIcon}>
                  <AntDesign name={'edit'} size={25} color={'gray'} />
                </View>
                <Text style={styles.txtItem}>Chỉnh sửa thông tin</Text>
                <AntDesign name={'right'} size={20} color={'gray'} style={{marginRight: screenWidth/36}} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewItem} onPress={this.handleHelp}>
            <View style={styles.viewTxt}>
              <View style={styles.viewRow}>
                <View style={styles.viewIcon}>
                  <AntDesign name={'questioncircleo'} size={25} color={'gray'} />
                </View>
                <Text style={styles.txtItem}>Trợ giúp</Text>
                <AntDesign name={isHelp ? 'up' : 'down'} size={20} color={'gray'} style={{marginRight: screenWidth/36}} />
              </View>
              {isHelp &&
              <View style={styles.overView}>
                 <Text style={styles.txtTitle}>Liên Hệ</Text>
                 <Text style={styles.txtDesc}>
                  Trong lúc sử dụng nếu có bất kỳ thắc mắc, hỏi đáp nào xin vui lòng liên hệ tới:
                 </Text>
                 <Text style={{...styles.txtDesc, color: 'blue', opacity: 0.5}}>
                  wegocontact2020@gmail.com
                 </Text>
              </View>}
             </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewItem} onPress={this.signOut}>
            <View style={styles.viewTxt}>
              <View style={styles.viewRow}>
                <View style={styles.viewIcon}>
                  <AntDesign name={'logout'} size={25} color={'gray'} />
                </View>
                <Text style={{...styles.txtItem, color: Colors.orangered, opacity: 0.7}}>Đăng xuất</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, null)(MainAccountScreen);
