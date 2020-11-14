import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import styles from '../../styles/AccountScreenStyle/MainAccountScreenStyle';
import { MaterialCommunityIcons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BASEURL } from '../../api/api';

// @ts-ignore
import { thumbnails } from '../../constants/FunctionCommon';
import { screenWidth } from '../../constants/Dimensions';

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

class MainAccountScreen extends Component<Props> {
  _navListener: any;

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

  render() {
    const thumbnail =
      this.props.user.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${this.props.user.avatar}` }
        : thumbnails['avatar' + this.props.user.avatar];
    return (
      <View>
        <View style={styles.headerContainer}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
          <View style={styles.header}>
            <Image source={thumbnail} style={styles.avatar} />
            <Text style={styles.textUser}>{this.props.user.name}</Text>
            <Text style={styles.email}>{this.props.user.email}</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <TouchableOpacity style={styles.overView}>
            <MaterialCommunityIcons
              name={'home-outline'}
              size={25}
              color={'gray'}
              style={{ marginLeft: screenWidth / 205.5 }}
            />
            <Text
              style={styles.textOverview}
              onPress={() => {
                this.props.navigation.navigate('AudioRecordingScreen');
              }}
            >
              Tổng quan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.setting}
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
            <EvilIcons name={'user'} size={30} color={'gray'} />
            <Text style={styles.textSetting}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.help} onPress={() => {}}>
            <MaterialCommunityIcons name={'flag-outline'} size={25} color={'gray'} />
            <Text style={styles.textHelp}>Trợ giúp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOut} onPress={this.signOut}>
            <AntDesign name={'logout'} size={20} color={'gray'} style={{ marginLeft: screenWidth / 137 }} />
            <Text style={styles.textSignOut}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(MainAccountScreen);
