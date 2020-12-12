import React, { Component } from 'react';
import { View, Text, Platform, FlatList, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import ListItemActivity from './ListItemActivity';
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from '../../../../assets/images/toast.png';
// @ts-ignore
import car from '../../../../assets/images/car.png';
// @ts-ignore
import wifi from '../../../../assets/images/wifi.png';
// @ts-ignore
import puzzle from '../../../../assets/images/puzzle.png';
import Colors from '../../../constants/Colors';
import { SearchBar } from 'react-native-elements';
import { screenWidth } from '../../../constants/Dimensions';
import { connect } from 'react-redux';
import { BASEURL } from '../../../api/api';
import LottieView from 'lottie-react-native';
import ListEmpty from '../../components/ListEmpty';

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  navigation?: any;
  user?: any;
};

type States = {
  data?: any[];
  loading?: boolean;
  value?: string;
};

class MainActivityScreen extends Component<Props, States> {
  state = {
    value: '',
    data: [],
    loading: false,
  };

  arrayData = [];
  _navListener: any;

  componentDidMount() {
    this.getDataActivity();
    //set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  getDataActivity = async () => {
    this.setState({ loading: true });
    fetch(`${BASEURL}/api/userActivity/get_list_all_user_activity/${this.props.user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false,
        });
        this.arrayData = res.data;
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log(error);
      });
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });
    const newData = this.arrayData.filter((item) => {
      const itemData = `${item.trip_id.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
        <View>
          <SearchBar
            placeholder="Tìm Kiếm..."
            lightTheme
            platform={Platform.OS == 'android' ? 'android' : 'default'}
            clearIcon={{ size: 24, name: 'clear' }}
            round={true}
            searchIcon={{ size: 26, name: 'search' }}
            onChangeText={(text) => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
            inputStyle={styles.input}
            inputContainerStyle={styles.containerInput}
            containerStyle={styles.containerSearchBar}
          />
        </View>
        <View style={styles.scrollView}>
          <Text style={styles.title}>Hoạt Động Gần Đây</Text>
          {this.state.loading ? (
            <View style={styles.activityIndicator}>
              <LottieView
                style={styles.viewLottie}
                source={require('../../../../assets/lotties/WaveLoading.json')}
                autoPlay
                loop
              />
            </View>
          ) : (
            <FlatList
              scrollEnabled
              data={this.state.data}
              initialNumToRender={7}
              removeClippedSubviews
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <ListItemActivity data={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id.toString()}
              ListEmptyComponent={() => (
                <View style={styles.viewEmpty}>
                  <ListEmpty 
                    title={'Hiện tại chưa có hoạt động nào được ghi lại'}
                    titleAction={null}
                    action={null}
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    marginTop: screenWidth / 41.1,
  },
  title: {
    fontSize: 25,
    marginBottom: screenWidth / 36,
    marginLeft: screenWidth / 20.55,
    opacity: 0.5,
  },
  input: {
    width: screenWidth / 2.2,
    height: screenWidth / 9,
    fontSize: 16,
    color: Colors.black,
  },
  containerInput: {
    backgroundColor: Colors.white,
    borderRadius: screenWidth / 82.2,
    elevation: 0,
  },
  containerSearchBar: {
    paddingHorizontal: screenWidth / 27.4,
    height: screenWidth / 3.7,
    paddingTop: screenWidth / 13.7,
    paddingBottom: screenWidth / 41.1,
    justifyContent: 'center',
    backgroundColor: Colors.tintColor,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLottie: {
    width: screenWidth / 3.6,
    height: screenWidth / 3.6,
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps, null)(MainActivityScreen);
