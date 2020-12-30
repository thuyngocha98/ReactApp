import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, Image, StatusBar } from 'react-native';
import SplashScreenStyles from '../styles/SplashScreen/SplashScreenStyles';
import Colors from '../constants/Colors';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../actions/action';
import { screenWidth } from '../constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  navigation?: any;
  getDataUser?: any;
  user?: any;
};

class SplashScreen extends Component<Props> {

  receiveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('jwt');
      return value;
    } catch (error) {
      return null;
    }
  };

  async componentDidMount() {
    const { navigation, user } = this.props;
    const data = await this.receiveToken();
    if (data) {
      try {
        await this.props.getDataUser();
        if(user) {
          navigation.navigate('GroupScreen');
        }
        else {
          await AsyncStorage.removeItem('jwt');
          navigation.navigate('MainLoginScreen');
        }
      } catch (error) {
        alert(error);
      }
    } else {
      navigation.navigate('MainLoginScreen');
    }
  }

  render() {
    return (
      <View style={SplashScreenStyles.viewStyles}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent />
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
