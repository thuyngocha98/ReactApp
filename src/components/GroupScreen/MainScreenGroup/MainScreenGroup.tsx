import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import MainScreenGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/MainScreenGroupStyles';
import ListItemGroup from './ListItemGroup';
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { getApiListTrip } from '../../../actions/action';
import { thumbnails } from '../../../constants/FunctionCommon';
import { SearchBar } from 'react-native-elements';
import { screenWidth } from '../../../constants/Dimensions';
import LottieView from 'lottie-react-native';
import ListEmpty from '../../components/ListEmpty';

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
          await this.calculateTotalMoney(res.data);
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

  async calculateTotalMoney(data) {
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
            <View style={{ flexDirection: 'row' }}>
              <Text style={MainScreenGroupStyles.textTotal}>Bạn tham gia {this.state.data.length} nhóm du lịch</Text>
            </View>
            <Text style={MainScreenGroupStyles.email}>({this.props.user.email})</Text>
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
              ListEmptyComponent={() => (
                <View style={MainScreenGroupStyles.viewEmpty}>
                  {this.state.value.length == 0 && 
                    <ListEmpty
                      title={'Hiện tại bạn chưa tham gia nhóm nào'}
                      titleAction={'Bắt đầu tạo nhóm mới'}
                      action={() => this.props.navigation.navigate('CreateGroupScreen')}
                    />
                  }
                </View>
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          )}
        </View>
        {this.state.data.length > 0 &&
        <TouchableOpacity style={styles.addTrip}
          activeOpacity={0.5}
          onPress={ () => this.props.navigation.navigate('CreateGroupScreen')}
        >
          <MaterialIcons name={'add'} color={Colors.white} size={screenWidth/10}/>
        </TouchableOpacity>}
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
  addTrip: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: screenWidth / 7.5,
    height: screenWidth / 7.5,
    borderRadius: screenWidth / 4,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.tintColor
  }
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
