import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Heatmap } from 'react-native-maps';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import moment from 'moment';
import * as Location from 'expo-location';

type Props = {
  navigation?: any;
};

type States = {
  latLng?: any;
  currentPosition?: any;
};

class MainDirectionScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      latLng: null,
      currentPosition: null,
    };
  }

  UNSAFE_componentWillMount = async () => {};

  componentDidMount() {}

  getLocationTrip = async () => {
    let shareLocation = await Location.getCurrentPositionAsync({});
  };

  location = this.props.navigation.getParam('location', '');

  initLocation = {
    latitude: this.location.latitude,
    longitude: this.location.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.03,
  };

  render() {
    console.log(this.location);
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <MapView zoomEnabled={true} style={styles.mapStyle} provider={PROVIDER_GOOGLE} region={this.initLocation}>
          <Marker coordinate={this.location} title={'Direction'} description={'marker description'}></Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight / 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingLeft: 10,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  back: {
    color: Colors.tintColor,
    fontSize: 20,
    marginLeft: 7,
    marginTop: 2,
  },
  backgroundMarker: {
    width: screenWidth / 12,
    height: screenWidth / 12,
    borderRadius: screenWidth / 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(247,189,66,0.8)',
    borderWidth: 3,
  },
  customMarker: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.tintColor,
    textAlign: 'center',
  },
});

export default MainDirectionScreen;
