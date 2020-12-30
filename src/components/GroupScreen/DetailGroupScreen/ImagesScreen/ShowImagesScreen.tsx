import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image, ScrollView, Modal } from 'react-native';
import Colors from '../../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../../constants/Dimensions';
import { BASEURL } from '../../../../api/api';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import localization from 'moment/locale/vi';
import ListEmpty from '../../../components/ListEmpty';
moment.updateLocale("vi", localization);
function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  listImage?: any;
  isModelVisible?: boolean;
  imageModal?: string;
};

class ShowImagesScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  state = {
    listImage: [],
    isModelVisible: false,
    imageModal: '',
  };
  tripId = '';
  _navListener: any;

  componentDidMount() {
    //set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.tripId = this.props.navigation.getParam('tripId', '');
      this.getImage(this.tripId);
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  getImage = async (tripId) => {
    fetch(`${BASEURL}/api/image/get_images_by_tripId/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            listImage: res.data.reverse(),
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  toggleModal = () => {
    this.setState({ isModelVisible: !this.state.isModelVisible });
  };

  onZoomImage = (item) => {
    this.setState({ imageModal: item });
    this.toggleModal();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal visible={this.state.isModelVisible} transparent={false} onRequestClose={() => this.toggleModal()}>
          <ImageViewer useNativeDriver={true} imageUrls={[{ url: `${BASEURL}/images/uploads/${this.state.imageModal}` }]} />
          <TouchableOpacity
            onPress={this.toggleModal}
            style={styles.viewDropModalZoom}
          >
            <Feather name={'x'} color={Colors.black} size={18} />
          </TouchableOpacity>
        </Modal>
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
            <Text style={styles.addContact}>Hình ảnh chuyến đi</Text>
            <View style={styles.save}>
              <Text style={styles.add}>upload</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
          {this.state.listImage.length > 0 ? (
            this.state.listImage.map((images) => (
              <View key={images._id} style={styles.viewItem} >
                <Text>{moment(images.create_date).format('LLL')}</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={images.imageURL}
                  renderItem={({ item }) => (
                    <View style={styles.viewItemImage} >
                      <TouchableOpacity onPress={() => this.onZoomImage(item)}>
                        <Image
                          source={{ uri: `${BASEURL}/images/uploads/${item}` }}
                          style={styles.itemImage}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.toString()}
                />
              </View>
            ))
          ) : (
            <View style={styles.viewEmpty}>
              <ListEmpty 
                title={'Hiện tại chưa có hình ảnh nào được ghi lại'}
                titleAction={null}
                action={null}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  viewItem: {
    padding: screenWidth / 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
  },
  viewItemImage: {
    marginTop: screenWidth / 72,
    marginRight: screenWidth / 36,
    width: screenWidth / 3,
    height: screenWidth / 4,
    borderWidth: 1,
    borderColor: Colors.lavender,
    borderRadius: 8,
    overflow: 'hidden'
  },
  itemImage: {
    resizeMode: 'cover',
    width: screenWidth / 3,
    height: screenWidth / 4,
    borderRadius: 8,
  },
  viewDropModalZoom: {
    zIndex: 10,
    backgroundColor: Colors.lightgray,
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: screenWidth / 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: screenWidth / 36,
    top: screenWidth / 36,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + getStatusBarHeight(),
    backgroundColor: Colors.tabIconSelected,
  },
  header: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: screenWidth / 27.43,
  },
  addContact: {
    flex: 5,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  cancel: {
    flex: 2,
  },
  add: {
    fontSize: 17,
    color: Colors.tintColor,
  },
  save: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textHeaderLeft: {
    fontSize: 17,
    color: Colors.white,
  },
  showImage: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  title1: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  txttitle: {
    fontSize: 17,
  },
  flatlist: {
    flex: 1,
  },
  viewImage: {
    width: screenWidth / 3,
    height: screenWidth / 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  image: {
    marginTop: 5,
    width: screenWidth / 3 - 2,
    height: screenWidth / 3 - 2,
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps)(ShowImagesScreen);
