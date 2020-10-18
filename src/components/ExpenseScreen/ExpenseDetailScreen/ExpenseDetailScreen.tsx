import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT } from '../../../constants/Dimensions';
import { Ionicons, Octicons } from '@expo/vector-icons';
import ExpenseDetailScreenStyles from '../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseDetailScreenStyles';

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation?: any;
};

type States = {
  check1?: boolean;
  check2?: boolean;
  check3?: boolean;
  check4?: boolean;
};

class ExpenseDetailScreen extends Component<Props, States> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Expense details',
      headerStyle: {
        elevation: 0,
        textAlign: 'center',
        height: APPBAR_HEIGHT,
        backgroundColor: Colors.tintColor,
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: Colors.white,
      },
      headerRight: <View style={{ marginRight: 15 }} />,
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-close" size={45} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  state = {
    check1: true,
    check2: false,
    check3: false,
    check4: false,
  };
  _navListener: any;

  componentDidMount() {
    // set barstyle of statusbar
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    // remove barstyle when lead screen
    this._navListener.remove();
  }

  _isCheck(number) {
    switch (number) {
      case 1:
        this.setState({
          check1: true,
          check2: false,
          check3: false,
          check4: false,
        });
        break;
      case 2:
        this.setState({
          check1: false,
          check2: true,
          check3: false,
          check4: false,
        });
        break;
      case 3:
        this.setState({
          check1: false,
          check2: false,
          check3: true,
          check4: false,
        });
        break;
      case 4:
        this.setState({
          check1: false,
          check2: false,
          check3: false,
          check4: true,
        });
        break;
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={ExpenseDetailScreenStyles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={'transparent'} translucent />
        <View style={ExpenseDetailScreenStyles.header}>
          <Text style={ExpenseDetailScreenStyles.txtHeader}>How was this expense split?</Text>
        </View>
        <ScrollView>
          <View style={ExpenseDetailScreenStyles.listItem}>
            <TouchableOpacity onPress={() => this._isCheck(1)}>
              <View style={ExpenseDetailScreenStyles.listItemDetail}>
                <View style={ExpenseDetailScreenStyles.avatar}>
                  <Image
                    style={ExpenseDetailScreenStyles.avatar1}
                    source={{
                      uri:
                        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB',
                    }}
                  />
                  <Image
                    style={ExpenseDetailScreenStyles.avatar2}
                    source={require('../../../../assets/images/icon-home.png')}
                  />
                </View>
                <View style={ExpenseDetailScreenStyles.content}>
                  <Text style={ExpenseDetailScreenStyles.txt1}>You paid, split equally.</Text>
                  <Text style={ExpenseDetailScreenStyles.txt2}>Ha owes you 2.612.00 US$.</Text>
                </View>
                <View style={[ExpenseDetailScreenStyles.iconCheck, { opacity: this.state.check1 ? 1 : 0 }]}>
                  <Octicons name="check" size={30} color={Colors.mediumseagreen} />
                </View>
              </View>
              <View style={ExpenseDetailScreenStyles.underLineInput} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._isCheck(2)}>
              <View style={ExpenseDetailScreenStyles.listItemDetail}>
                <View style={ExpenseDetailScreenStyles.avatar}>
                  <Image
                    style={ExpenseDetailScreenStyles.avatar1}
                    source={{
                      uri:
                        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB',
                    }}
                  />
                  <Image
                    style={ExpenseDetailScreenStyles.avatar2}
                    source={require('../../../../assets/images/icon-home.png')}
                  />
                </View>
                <View style={ExpenseDetailScreenStyles.content}>
                  <Text style={ExpenseDetailScreenStyles.txt1}>You are owed the full amount.</Text>
                  <Text style={ExpenseDetailScreenStyles.txt2}>Ha owes you 5,224.00 US$.</Text>
                </View>
                <View style={[ExpenseDetailScreenStyles.iconCheck, { opacity: this.state.check2 ? 1 : 0 }]}>
                  <Octicons name="check" size={30} color={Colors.mediumseagreen} />
                </View>
              </View>
              <View style={ExpenseDetailScreenStyles.underLineInput} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._isCheck(3)}>
              <View style={ExpenseDetailScreenStyles.listItemDetail}>
                <View style={ExpenseDetailScreenStyles.avatar}>
                  <Image
                    style={ExpenseDetailScreenStyles.avatar3}
                    source={{
                      uri:
                        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB',
                    }}
                  />
                  <Image
                    style={ExpenseDetailScreenStyles.avatar4}
                    source={require('../../../../assets/images/icon-home.png')}
                  />
                </View>
                <View style={ExpenseDetailScreenStyles.content}>
                  <Text style={ExpenseDetailScreenStyles.txt1}>Trung paid, split equally.</Text>
                  <Text style={ExpenseDetailScreenStyles.txt3}>You owes trung 2.612.00 US$.</Text>
                </View>
                <View style={[ExpenseDetailScreenStyles.iconCheck, { opacity: this.state.check3 ? 1 : 0 }]}>
                  <Octicons name="check" size={30} color={Colors.mediumseagreen} />
                </View>
              </View>
              <View style={ExpenseDetailScreenStyles.underLineInput} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._isCheck(4)}>
              <View style={ExpenseDetailScreenStyles.listItemDetail}>
                <View style={ExpenseDetailScreenStyles.avatar}>
                  <Image
                    style={ExpenseDetailScreenStyles.avatar3}
                    source={{
                      uri:
                        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB',
                    }}
                  />
                  <Image
                    style={ExpenseDetailScreenStyles.avatar4}
                    source={require('../../../../assets/images/icon-home.png')}
                  />
                </View>
                <View style={ExpenseDetailScreenStyles.content}>
                  <Text style={ExpenseDetailScreenStyles.txt1}>Trung is owed the full amount.</Text>
                  <Text style={ExpenseDetailScreenStyles.txt3}>You owes trung 5.224.00 US$.</Text>
                </View>
                <View style={[ExpenseDetailScreenStyles.iconCheck, { opacity: this.state.check4 ? 1 : 0 }]}>
                  <Octicons name="check" size={30} color={Colors.mediumseagreen} />
                </View>
              </View>
              <View style={ExpenseDetailScreenStyles.underLineInput} />
            </TouchableOpacity>
          </View>
          <View style={ExpenseDetailScreenStyles.btnMoreOption}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpenseMoreOptionScreen');
              }}
            >
              <Text style={ExpenseDetailScreenStyles.txtMoreOption}>More Options</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ExpenseDetailScreen);
