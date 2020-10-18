import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList, Image, ScrollView, Modal } from 'react-native';
import Colors from '../../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../../constants/Dimensions';
import { BASEURL } from '../../../../api/api';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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
        console.log(error);
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
          <ImageViewer imageUrls={[{ url: `${BASEURL}/images/uploads/${this.state.imageModal}` }]} />
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
              <Text style={styles.textHeaderLeft}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.addContact}>Picture Memories</Text>
            <View style={styles.save}>
              <Text style={styles.add}>upload</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
          {this.state.listImage.map((images) => (
            <View
              key={images._id}
              style={{
                padding: screenWidth / 24,
                borderBottomWidth: 1,
                borderBottomColor: Colors.lightgray,
              }}
            >
              <Text>{images.create_date.split('T')[0]}</Text>
              <FlatList
                horizontal
                data={images.imageURL}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginTop: screenWidth / 72,
                      marginRight: screenWidth / 36,
                      width: screenWidth / 4.5,
                      height: screenWidth / 4,
                    }}
                  >
                    <TouchableOpacity onPress={() => this.onZoomImage(item)}>
                      <Image
                        source={{ uri: `${BASEURL}/images/uploads/${item}` }}
                        style={{
                          resizeMode: 'stretch',
                          width: screenWidth / 4.5,
                          height: screenWidth / 4,
                          borderRadius: 8,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.toString()}
              />
            </View>
          ))}
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
});

export default connect(mapStateToProps)(ShowImagesScreen);
