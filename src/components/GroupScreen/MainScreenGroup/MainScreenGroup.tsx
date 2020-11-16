import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import MainScreenGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/MainScreenGroupStyles';
import ListItemGroup from './ListItemGroup';
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { getApiListTrip } from '../../../actions/action';
import { number2money, thumbnails } from '../../../constants/FunctionCommon';
import { SearchBar } from 'react-native-elements';
import { screenWidth } from '../../../constants/Dimensions';
import LottieView from 'lottie-react-native';
import { CONTACTS } from 'expo-permissions';
import { Col } from 'native-base';

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
    userId: state.dataUser.dataUser._id,
    avatar: state.dataUser.dataUser.avatar,
    saveTripId: state.saveTripId.tripId,
  };
}

type Props = {
  navigation?: any;
  getListAllTrip?: any;
  listAllTrip?: [];
  dispatch?: any;
  userId?: any;
  avatar?: any[];
  user?: any;
  saveTripId?: string;
};

type States = {
  data?: any[];
  loading?: boolean;
  total?: Number;
  value?: string;
};

class MainScreenGroup extends Component<Props, States> {
  state = {
    data: [],
    loading: false,
    total: 0,
    value: '',
  };

  arrayData = [];

  isOwned: boolean;

  totalMoney: Number;

  _navListener: any;

  UNSAFE_componentWillMount() {
    this.getListAllTrip();
  }

  thumbnail;

  async componentDidMount() {
    //set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
      if (this.props.userId != undefined) {
        this.thumbnail =
          this.props.user.avatar.length > 2
            ? { uri: `${BASEURL}/images/avatars/${this.props.user.avatar}` }
            : thumbnails['avatar' + this.props.user.avatar];
      }
      // call api get list group
      await this.getListAllTrip();
      if (this.props.saveTripId !== '') {
        let items = await this.state.data.find((item) => item._id == this.props.saveTripId);
        this.props.navigation.navigate('DetailGroupScreen', { dataTrip: items });
      }
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  getListAllTrip = async () => {
    if (this.props.userId != undefined) {
      this.setState({ loading: true });
      fetch(`${BASEURL}/api/transactionUser/get_total_money_user_by_id/${this.props.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then(async (res) => {
          await this.props.getListAllTrip(res.data.reverse());
          await this.caculateTotalMoney(res.data);
          await this.setState({
            data: res.data,
            loading: false,
          });
          this.arrayData = res.data;
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  async caculateTotalMoney(data) {
    this.totalMoney = 0;
    await data.forEach((element) => {
      this.totalMoney += element.oweUser;
    });
    this.setState({ total: this.totalMoney });
  }

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });
    const newData = this.arrayData.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <View style={MainScreenGroupStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
        <View style={styles.container}>
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
        <Text style={MainScreenGroupStyles.group}>Nhóm</Text>
        <View style={MainScreenGroupStyles.cartExpense}>
          <Image style={MainScreenGroupStyles.avatar} source={this.thumbnail} />
          <View style={MainScreenGroupStyles.text}>
            <Text style={MainScreenGroupStyles.textTotal}>Tổng số dư</Text>
            <View>
              {this.state.total >= 0 ? (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.white }}> Bạn lấy lại : </Text>
                  <Text style={{ color: Colors.mediumseagreen }}>{number2money(this.state.total)} VND</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.white }}> Bạn nợ : </Text>
                  <Text style={{ color: Colors.orangered }}>{number2money(this.state.total * -1)} VND</Text>
                </View>
              )}
            </View>
          </View>
          <View style={MainScreenGroupStyles.menu}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="menu" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.loading ? (
            <View style={MainScreenGroupStyles.activityIndicator}>
              <LottieView
                style={MainScreenGroupStyles.viewLottie}
                source={require('../../../../assets/lotties/WaveLoading.json')}
                autoPlay
                loop
              />
            </View>
          ) : (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                (this.isOwned = item.oweUser >= 0 ? true : false),
                (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('DetailGroupScreen', { dataTrip: item });
                    }}
                  >
                    {item.isDelete ? null : (
                      <ListItemGroup
                        dataTrip={item}
                        nameGroup={item.name}
                        price={item.oweUser}
                        isOwned={this.isOwned}
                      />
                    )}
                  </TouchableOpacity>
                )
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'column',
    backgroundColor: Colors.background,
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
  container: {
    backgroundColor: Colors.tintColor,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListAllTrip: (dataListAllTrip) => getApiListTrip(dataListAllTrip),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenGroup);
