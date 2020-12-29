import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';
import { StyleSheet, View, Dimensions, SafeAreaView, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { screenWidth, screenHeight } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { BASEURL } from '../../api/api';
import {thumbnail} from '../../constants/FunctionCommon'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import ModalLoading from '../../components/components/ModalLoading'
import moment from 'moment';
import localization from 'moment/locale/vi'
function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  navigation?: any;
  user?: {
    _id: string,
  }
};

type States = {
  loading?: boolean,
  data?: any[],
  modalVisible?: boolean,
  userDirection?: {
    user_id?: {
      name?: string,
    },
    locationUser?: {
      latitude?: Number,
      longitude?: number,
    }
  },
  routeCoordinates?: any[],
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class MainDirectionScreen extends React.Component<Props, States> {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: [],
    loading: true,
    modalVisible: false,
    userDirection: {
      user_id: {
        name: "",
      },
      locationUser: {
        latitude: null,
        longitude: null,
      }
    },
    routeCoordinates: [],
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  }
  mapRef: MapView;

  componentDidMount() {
    this.getLocationAllUser();
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  getLocationAllUser = () => {
    this.setState({loading: true})
    let tripId = this.props.navigation.getParam('tripId', '');
    fetch(`${BASEURL}/api/tripUser/get_all_location_user_by_trip_id/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        
        let newData = [...res.data.filter(el => Object.keys(el.locationUser).length > 0)]
        this.setState({ 
          data: newData, 
          loading: false 
        });

        {/** calculator bound of marker */}
        let sortLatitude = [...newData.sort((a, b) => a.locationUser.latitude - b.locationUser.latitude)]; //sort location by increase latitude
        let sortLongitude = [...newData.sort((a, b) => a.locationUser.longitude - b.locationUser.longitude)]; //sort location by increase longitude
        let lengthArr = newData.length - 1;
        let deltaLatitude = sortLatitude[lengthArr].locationUser.latitude - sortLatitude[0].locationUser.latitude; // calculator delta latitude
        let deltaLongitude = sortLongitude[lengthArr].locationUser.longitude - sortLongitude[0].locationUser.longitude; // calculator delta longitude
        let headTailPoint = deltaLatitude >= deltaLongitude ? sortLatitude : sortLongitude;

        let latitude = (headTailPoint[0].locationUser.latitude + headTailPoint[lengthArr].locationUser.latitude) / 2;
        let longitude = (headTailPoint[0].locationUser.longitude + headTailPoint[lengthArr].locationUser.longitude) / 2;

        let latitudeDelta = 0;
        let longitudeDelta = 0;
        if(deltaLatitude > deltaLongitude){
            latitudeDelta = deltaLatitude * 1.3;
            longitudeDelta = latitudeDelta * ASPECT_RATIO;
        }else{
            longitudeDelta = deltaLongitude * 1.3;
            latitudeDelta = longitudeDelta / ASPECT_RATIO;
        }
        
        this.setState({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })  

      })
      .catch((error) => {
        this.setState({loading: false})
        alert(error);
      });
  }

  onOpenMap = () => {
    
    let mainUser = [...this.state.data].filter(el =>  {
      if(el.user_id._id == this.props.user._id)
        return el;
    })

    const startPoint = {
      longitude: mainUser[0].locationUser.longitude,
      latitude: mainUser[0].locationUser.latitude,
    };

    const endPoint = {
      longitude: this.state.userDirection.locationUser.longitude,
      latitude: this.state.userDirection.locationUser.latitude,
    };

    const transportPlan = 'd';
    this.toggleModal()
    OpenMapDirections(startPoint, endPoint, transportPlan);
  }

  onOpenModal = user => {
    this.setState({userDirection: user})
    this.toggleModal();
  }

  onQuickDirection = async () => {
    this.setState({loading: true})
    this.toggleModal()
    let mainUser = [...this.state.data].filter(el =>  {
      if(el.user_id._id == this.props.user._id)
        return el;
    })

    const startPoint = {
      longitude: mainUser[0].locationUser.longitude,
      latitude: mainUser[0].locationUser.latitude,
    }

    const endPoint = {
      longitude: this.state.userDirection.locationUser.longitude,
      latitude: this.state.userDirection.locationUser.latitude,
    };

    let coordinates = [startPoint].concat(endPoint);
    const data = JSON.stringify(coordinates);
    await fetch(`${BASEURL}/api/placeLocation/directions_between_two_point`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.setState({routeCoordinates: res.data})
        this.setState({loading: false})
      })
      .catch((error) => {
        this.setState({loading: false})
        alert(error);
      });
    // calculator bound map marker
    let deltaLatitude = Math.abs(startPoint.latitude - endPoint.latitude); // calculator delta latitude
    let deltaLongitude = Math.abs(startPoint.longitude - endPoint.longitude); // calculator delta longitude

    let latitude = (startPoint.latitude + endPoint.latitude) / 2;
    let longitude = (startPoint.longitude + endPoint.longitude) / 2;

    let latitudeDelta = 0;
    let longitudeDelta = 0;
    if(deltaLatitude > deltaLongitude){
        latitudeDelta = deltaLatitude * 1.3;
        longitudeDelta = latitudeDelta * ASPECT_RATIO;
    }else{
        longitudeDelta = deltaLongitude * 1.3;
        latitudeDelta = longitudeDelta / ASPECT_RATIO;
    }
    
    this.setState({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    }) 
  }

  sendNotification = async () => {
    this.setState({loading: true});
    let tripId = this.props.navigation.getParam('tripId', '');
    let data = {
      tripId: tripId,
      userId: this.props.user._id
    }
    await fetch(`${BASEURL}/api/tripUser/push_notification_request_location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (res) => {
        this.getLocationAllUser();
      })
      .catch((error) => {
        this.setState({loading: false})
        alert(error);
    });
  }

  renderTime = marker => {
    let time = marker.locationUser.update_date ? marker.locationUser.update_date : marker.locationUser.create_date
    let timeMoment = moment(time);
    moment.updateLocale("vi", localization);
    return timeMoment.fromNow();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <View style={styles.container}>
        {/* view modal loading */}
        <ModalLoading isVisible={this.state.loading} />
        {/* view modal */}
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.mainModal}
          coverScreen={false}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={this.toggleModal}
          >
              <View style={styles.viewModal}>
                  <Text style={styles.txtTitleModal}>
                      {`Đường đi từ bạn đến ${this.state.userDirection.user_id.name}`}
                  </Text>
                  <View style={styles.viewBtnModal}>
                      <TouchableOpacity
                        onPress={this.onQuickDirection}
                        style={[styles.btnModal,{borderRightWidth: 1,borderRightColor: Colors.lavender}]}>
                          <MaterialCommunityIcons name='directions-fork' size={20} color={Colors.tintColor} />
                          <Text style={styles.txtBtnModal}>Chỉ đường nhanh</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.onOpenMap}
                        style={styles.btnModal}>
                          <MaterialCommunityIcons name='directions' size={20} color={Colors.tintColor} />
                          <Text style={styles.txtBtnModal}>Chỉ đường chi tiết</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={(ref)=> this.mapRef = ref}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}
          >
            {this.state.routeCoordinates.length > 1 && (
              <Polyline 
              coordinates={this.state.routeCoordinates} 
              strokeColor={Colors.tintColor}
              fillColor={Colors.tintColor}
              strokeWidth={4} 
              />
            )}
            {this.state.data.length > 0 && (
              this.state.data.map((marker, i) => (
                <Marker
                  anchor={{ x: 0.5, y: 0.5 }}
                  key={marker._id}
                  coordinate={{
                      latitude: marker?.locationUser.latitude,
                      longitude: marker?.locationUser.longitude
                  }}
                >
                  <View>
                    <View style={styles.backgroundMarker}>
                      <Image
                        style={styles.imageAvatar}
                        source={thumbnail(marker.user_id.avatar)}
                      />
                    </View>
                  </View>
                  <Callout onPress={() => this.onOpenModal(marker)}>
                    <View style={styles.bubble}>
                      <View style={styles.viewTitle}>
                        <Text numberOfLines={1} style={styles.txtTitle}>{marker.user_id.name}</Text>
                        <Text numberOfLines={2} style={styles.txtDesc}>
                          {`cập nhật vị trí: ${this.renderTime(marker)}`}
                        </Text>
                      </View>
                      <View style={styles.viewDirection}>
                        <TouchableOpacity style={styles.btnDirection}>
                          <MaterialCommunityIcons name='directions-fork' size={20} color={Colors.tintColor} />
                          <Text style={styles.txtBtn}>chỉ đường</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              ))
            )}
          </MapView>
          <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.btnGoBack}>
            <Ionicons name='md-arrow-back' size={30} color={Colors.gray} />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={this.sendNotification}
          style={styles.btnUpdateLocation}>
            <Text style={styles.txtUpdateLocation}>Đồng bộ vị trí</Text>
            <Entypo name='location' size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  viewModal: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: screenWidth/36,
  },
  txtTitleModal: {
    fontSize: 16,
    color: Colors.blackText,
    paddingBottom: screenWidth/36,
    paddingHorizontal: screenWidth/11,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender
  },
  viewItemModal: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  viewBtnModal: {
    flexDirection: 'row',
  },
  txtBtnModal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackText,
    textAlign: 'center',
    paddingVertical: screenHeight/108
  },
  btnModal: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: screenHeight/56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnModalOption: {

  },
  txtModalOption: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.blackText,
    textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundMarker: {
    overflow: 'hidden',
    width: screenWidth / 12,
    height: screenWidth / 12,
    borderRadius: screenWidth / 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(247,189,66,0.8)',
    borderWidth: 2,
  },
  customMarker: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.tintColor,
    textAlign: 'center',
  },
  bubble: {
    flexDirection: 'row',
    width: screenWidth/1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewImage: {
    width: screenWidth / 8,
    height: screenWidth / 6.5,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: screenWidth/72,
  },
  imageAvatar: {
    resizeMode: 'cover',
    width: screenWidth / 12,
    height: screenWidth / 12,
    borderRadius: screenWidth/24,
  },
  image: {
    resizeMode: 'cover',
    width: screenWidth / 8,
    height: screenWidth / 6.5,
  },
  viewTitle: {
    flex: 2,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 13,
    color: Colors.blackText,
    fontWeight: 'bold',
  },
  txtDesc: {
    marginBottom: screenHeight/108,
    fontSize: 12,
    color: Colors.gray
  },
  viewDirection: {
    borderWidth: 0.5,
    borderColor: Colors.lavender,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnDirection: {
    flex: 1,
    paddingHorizontal: screenWidth/72,
    paddingVertical: screenHeight/108,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    fontSize: 12,
    color: Colors.tintColor
  },
  btnGoBack: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: screenWidth/20,
    left: screenWidth/24,
    height: screenHeight/16,
    paddingHorizontal: screenWidth/18,
    borderRadius: screenWidth/24,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  btnUpdateLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: screenWidth/20,
    right: screenWidth/24,
    height: screenHeight/16,
    paddingHorizontal: screenWidth/24,
    borderRadius: screenWidth/24,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  txtUpdateLocation: {
    fontSize: 12,
    color: Colors.gray,
    marginRight: screenWidth/24,
  }
});

export default connect(mapStateToProps, null)(MainDirectionScreen);
