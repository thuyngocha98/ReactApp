import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View, Platform, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, Octicons, AntDesign, Entypo, EvilIcons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import { screenHeight, screenWidth } from '../constants/Dimensions';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import { BASEURL } from '../api/api';
import {useSelector} from 'react-redux';

import AppNavigator from './AppNavigator';
import Colors from '../constants/Colors';

export default function AppNavigation(props) {
  const {user} = useSelector(states => ({user: states.dataUser.dataUser}));
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [notification, setNotification] = useState({
    data: {
      content: '',
    }
  });

  React.useEffect(() => {
    const check = () => {
      if(user){
        if(user?.token_notification){
          if(user.token_notification != expoPushToken && expoPushToken != ''){
            updateTokenNotification();
          }
        }
      }
    }
    return () => check;
  }, [user]);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
        });
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync();
    const _notificationSubscription = Notifications.addListener(_handleNotification);
    return () => _notificationSubscription;
  },[])

  const updateTokenNotification = async () => {
    let data = {
      userId: user._id,
      token_notification: expoPushToken,
    }
    await fetch(`${BASEURL}/api/user/update_token_notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (res) => {})
      .catch((error) => {
        alert(error);
      });
  }

  const _handleNotification = notification => {
      if(notification.origin == 'selected'){
        setSelected(true);
      }
      setNotification(notification);
  };

  const onPressCancel = () => {
    setSelected(false)
  }

  const onPressShareLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    } else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      let data = {
        userId: user._id,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }
      await fetch(`${BASEURL}/api/locationUser/create_or_update_location_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (res) => {})
        .catch((error) => {
          alert(error);
        });
    }
    setSelected(false);
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {/* view modal save */}
        <Modal
          avoidKeyboard
          isVisible={isSelected}
          style={styles.mainModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          >
            <View style={styles.viewModal}>
              <LottieView
                  style={styles.viewLottie}
                  source={require('../../assets/lotties/shareLocation.json')}
                  autoPlay
                  loop
              />
              <Text style={styles.txtTitle}>{notification.data.content}</Text>
              <View style={styles.viewBtn}>
                <TouchableOpacity 
                onPress={onPressCancel}
                style={styles.btn}>
                  <Text style={styles.txtBtnCancel}>Hủy bỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={onPressShareLocation} 
                style={styles.btn}>
                  <Text style={styles.txtBtnOK}>Chia sẻ</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('../../assets/images/wego.png'),
      require('../../assets/images/wallpaper.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      ...Feather.font,
      ...MaterialCommunityIcons.font,
      ...Octicons.font,
      ...AntDesign.font,
      ...Entypo.font,
      ...EvilIcons.font,
      // We include SpaceMono because we use it in FriendsScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModal: {
    width: screenWidth/1.5,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: screenWidth/36,
  },
  viewLottie: {
    alignSelf: 'center',
    width: screenWidth/3.6,
    height: screenWidth/3.6
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.black
  },
  txtBtnOK: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.tintColor
  },
  txtBtnCancel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.gray
  },
  btn: {
    marginTop: screenHeight/108,
    paddingVertical: screenHeight/108,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
