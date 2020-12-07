import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { screenWidth, APPBAR_HEIGHT } from '../../constants/Dimensions';
import { BASEURL } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import Colors from '../../constants/Colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import DetailPlaceGridScreen from './DetailPlaceGridScreen';

type Props = {
  navigation?: any;
};

type States = {
  dataPlace?: any[];
};

class PlaceGridScreen extends Component<Props, States> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataPlace: null,
    };
  }

  tripId = this.props.navigation.getParam('tripId');

  componentDidMount = async () => {
    await this.getDetailPlace();
  };

  getDetailPlace = async () => {
    await fetch(`${BASEURL}/api/placeLocation/get_placeLocation_by_trip_id/${this.tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({
          dataPlace: res.data,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.goback}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={screenWidth / 14} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.detailPlace}>Chi tiết những địa điểm đã đi qua</Text>
          </View>
        </View>
        <FlatList
          data={this.state.dataPlace}
          scrollEnabled
          renderItem={({ item }) => <DetailPlaceGridScreen data={item} />}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + getStatusBarHeight() + screenWidth / 50,
    backgroundColor: Colors.tintColor,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: getStatusBarHeight() + screenWidth / 40,
    justifyContent: 'space-between',
    marginHorizontal: screenWidth / 27.43,
  },
  goback: {
    height: '100%',
    paddingHorizontal: screenWidth / 72,
    // alignItems: 'center',
  },
  detailPlace: {
    flex: 1,
    fontSize: screenWidth / 22,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default PlaceGridScreen;
