import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import * as Location from 'expo-location';
import haversine from 'haversine';

type Props = {
  navigation?: any;
};

type States = {
  latitude?: any;
  longitude?: any;
  routeCoordinates?: any;
  distanceTravelled?: any;
  prevLatLng?: any;
  coordinate?: any;
};

class MainDirectionScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };

  location = this.props.navigation.getParam('currentLocation', '');
  destinationLocation = this.props.navigation.getParam('destinationLocation', '');

  ASPECT_RATIO = screenWidth / screenHeight;
  LATITUDE = this.location.latitude;
  LONGITUDE = this.location.longitude;
  LATITUDE_DELTA = 0.0922;
  LONGITUDE_DELTA = this.LATITUDE_DELTA * this.ASPECT_RATIO;
  watchID = 0;
  marker;

  constructor(props) {
    super(props);
    this.state = {
      latitude: this.LATITUDE,
      longitude: this.LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: this.LATITUDE,
        longitude: this.LONGITUDE,
        latitudeDelta: this.LATITUDE_DELTA,
        longitudeDelta: this.LONGITUDE_DELTA,
      }),
    };
  }

  UNSAFE_componentWillMount = async () => {};
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    this.watchLocation();
    let routeCoordinates = [];
    const destinationLocation = {
      latitude: this.destinationLocation.latitude,
      longitude: this.destinationLocation.longtitude,
    };
    routeCoordinates = routeCoordinates.concat(this.location);
    routeCoordinates = routeCoordinates.concat(destinationLocation);
    this.setState({
      routeCoordinates,
    });
  }

  watchLocation = async () => {
    this.watchID = navigator.geolocation.watchPosition(
      async (position) => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        let someArray = await routeCoordinates.slice(1);
        const newCoordinate = {
          latitude,
          longitude,
        };
        if (newCoordinate) {
          await someArray.unshift(newCoordinate);
          this.setState({
            routeCoordinates: someArray,
          });
        }
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  calcDistance = (newLatLng) => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.LATITUDE_DELTA,
    longitudeDelta: this.LONGITUDE_DELTA,
  });

  render() {
    const length = this.state.routeCoordinates.length;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled={true}
            region={this.getMapRegion()}
            provider={PROVIDER_GOOGLE}
          >
            {length > 1 && (
              <Polyline coordinates={this.state.routeCoordinates} strokeColor={Colors.tintColor} strokeWidth={4} />
            )}
            {length > 1 && (
              <Marker.Animated
                ref={(marker) => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
              />
            )}
            {length > 1 && (
              <Marker
                coordinate={{
                  latitude: this.destinationLocation.latitude,
                  longitude: this.destinationLocation.longtitude,
                }}
              />
            )}
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MainDirectionScreen;
