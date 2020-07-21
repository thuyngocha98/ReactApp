import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import moment, { lang } from 'moment';

type Props = {
  navigation?: any;
};

type States = {
  initialLocation?: any;
  currentPosition?: any;
  currentPositionLatitude?: any;
  currentPositionLongtitude?: any;
  location?: any;
  coordinates?: any;
};

class MainLocationScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null, //works with createStackNavigator but not with createBottomTabNavigator
  };

  constructor(props) {
    super(props);
    this.state = {
      initialLocation: null,
      currentPosition: null,
      currentPositionLatitude: null,
      currentPositionLongtitude: null,
      location: null,
      coordinates: [],
    };
  }

  componentDidMount() {
    this.permissionAndGetLocation();
    this.getLocationTrip();
  }

  permissionAndGetLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert("Hey! You don't enable location ");
    } else {
      let data = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let currentPosition = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.05,
      };
      let region = {
        latitude: 37.8025259, //data.coords.latitude,
        longitude: -122.4351431, //data.coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.05,
      };
      this.setState({
        initialLocation: region,
        currentPosition,
        currentPositionLatitude: data.coords.latitude,
        currentPositionLongtitude: data.coords.longitude,
      });
    }
  };

  getLocationTrip = async () => {
    const tripId = this.props.navigation.getParam('tripId');
    await fetch(`${BASEURL}/api/placeLocation/get_placeLocation_by_trip_id/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({ coordinates: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const length = this.state.coordinates.length;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {length > 0 ? (
          <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} region={this.state.initialLocation}>
            {length > 1 && (
              <Polygon
                coordinates={this.state.coordinates}
                strokeColor={Colors.lightgray}
                strokeWidth={1}
                fillColor={'rgba(100,100,200,0.3)'}
              />
            )}
            {this.state.coordinates.map((marker, i) => (
              <Marker
                key={i}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.address}
                description={`${moment(marker.create_date).format('dddd')}, ${moment(marker.create_date).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}`}
              ></Marker>
            ))}
          </MapView>
        ) : (
          <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} region={this.state.currentPosition}>
            <Marker
              coordinate={{
                latitude: Number(this.state.currentPositionLatitude),
                longitude: Number(this.state.currentPositionLongtitude),
              }}
            ></Marker>
          </MapView>
        )}
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
});

export default MainLocationScreen;
