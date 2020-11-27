import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Heatmap } from 'react-native-maps';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import moment from 'moment';

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
    this.getLocationTrip();
  }

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
        (await res.data.length) > 0 && (await this.setState({ coordinates: res.data }));
      })
      .catch((error) => {
        alert(error);
      });
    if (this.state.coordinates[0]) {
      let location = await this.state.coordinates[0];
      let currentPosition = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      let currentPositionLatitude = location.latitude;
      let currentPositionLongtitude = location.longtitude;
      this.setState({
        currentPosition,
        currentPositionLatitude,
        currentPositionLongtitude,
      });
    }
  };

  render() {
    const length = this.state.coordinates.length;
    console.log(length);
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {length > 0 ? (
          <MapView
            zoomEnabled={true}
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            region={this.state.currentPosition}
          >
            {length > 1 && (
              <Polyline coordinates={this.state.coordinates} strokeColor={Colors.tintColor} strokeWidth={4} />
            )}
            {this.state.coordinates.map((marker, i) => (
              <Marker
                anchor={{ x: 0.5, y: 0.5 }}
                key={i}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.address}
                description={`${moment(marker.create_date).format('dddd')}, ${moment(marker.create_date).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}`}
              >
                <View>
                  <View style={styles.backgroundMarker}>
                    <Text style={styles.customMarker}>{i + 1}</Text>
                  </View>
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} region={this.state.currentPosition}>
            {/* <Marker
              coordinate={{
                latitude: Number(this.state.currentPositionLatitude),
                longitude: Number(this.state.currentPositionLongtitude),
              }}
            ></Marker> */}
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

export default MainLocationScreen;
