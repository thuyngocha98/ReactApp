import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { screenWidth, APPBAR_HEIGHT } from '../../constants/Dimensions';
import { BASEURL } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import DetailPlaceGridScreen from './DetailPlaceGridScreen';
import Constants from "expo-constants";

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
          dataPlace: res.data.reverse(),
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
                style={styles.cancel}
                activeOpacity={0.5}
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            >
                <Ionicons name="ios-arrow-back" size={32} color={Colors.white} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.addContact}>
              Chi tiết những địa điểm đã đi qua
            </Text>
            <View style={styles.save} />
          </View>
        </View>
        <FlatList
          data={this.state.dataPlace}
          scrollEnabled
          renderItem={({ item }) => <DetailPlaceGridScreen data={item} />}
          keyExtractor={(item) => item._id.toString()}
          initialNumToRender={4}
          removeClippedSubviews
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeaderLeft: {
    fontSize: 17,
    color: Colors.white
  },
  containerHeader: {
      width: screenWidth,
      height: APPBAR_HEIGHT + Constants.statusBarHeight,
      backgroundColor: Colors.tabIconSelected,
  },
  header: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      flexDirection: 'row',
      alignItems: 'center',
  },
  addContact: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: Colors.white,
      textAlign: 'center',
  },
  cancel: {
      paddingLeft: screenWidth/27,
      paddingRight: screenWidth/24,
      paddingVertical: screenWidth/72,
  },
  save: {
      paddingRight: screenWidth/27,
      paddingLeft: screenWidth/27,
      paddingVertical: screenWidth/72,
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
