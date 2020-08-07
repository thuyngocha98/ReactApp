import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import SplashScreenStyles from '../styles/SplashScreen/SplashScreenStyles';
import Colors from '../constants/Colors';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../actions/action';
import { BASEURL } from '../api/api';
import { screenWidth } from '../constants/Dimensions';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
  getDataUser?: any;
};

type States = {
  token?: String;
};

class SplashScreen extends Component<Props, States> {
  state = {
    token: '',
  };
  receiveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('jwt');
      return value;
    } catch (error) {
      alert(error);
    }
  };

  async componentWillMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      const dataUser = await this.props.getDataUser();
      if (dataUser !== null) {
        this.props.navigation.navigate('GroupScreen');
      }
    } else {
      this.props.navigation.navigate('MainLoginScreen');
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(this.receiveToken());
      }, 2000),
    );
  };

  render() {
    return (
      <View style={SplashScreenStyles.viewStyles}>
        <View style={SplashScreenStyles.logo}>
          <Image
            style={{
              width: screenWidth / 1.644,
              height: screenWidth / 3.91,
              tintColor: Colors.tintColor,
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/wego.png')}
          />
        </View>
        <View style={SplashScreenStyles.indicator}>
          <ActivityIndicator animating size="small" color={Colors.tintColor} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDataUser: getApiDataUser,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
