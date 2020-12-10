import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import ListItemBalanceStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/ListItemBalanceStyles';
import { number2money, thumbnails } from '../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../api/api';

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  nameSecondSub?: string;
  data?: {
    _id?: string,
    totalBalanceTrip?: any,
    avatar?: any,
    name?: string,
  };
  tripId?: string;
  handleRemind?: (_: boolean) => void;
  handleResolve?: () => void;
  handleLoading?: (_: boolean) => void;
};

type States = {
  isShow?: boolean;
};

class ListItemBalance extends PureComponent<Props, States> {
  state = {
    isShow: false,
  };

  remind = () => {
    this.props.handleLoading(true);
    const data = {
      tripId: this.props.tripId,
      userIdReminded: this.props.data._id,
      amountUserRemind: this.props.data.totalBalanceTrip,
    };
    const json = JSON.stringify(data);
    fetch(`${BASEURL}/api/user/remind_payment_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        this.props.handleRemind(true);
        this.props.handleLoading(false);
      })
      .catch((error) => {
        this.props.handleRemind(false);
        this.props.handleLoading(false);
      });
  };
  render() {
    const thumbnail =
      this.props.data.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${this.props.data.avatar}` }
        : thumbnails['avatar' + this.props.data.avatar];
    return (
      <View style={ListItemBalanceStyles.container}>
        <View style={ListItemBalanceStyles.firtItem}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={ListItemBalanceStyles.touchStyle}
            onPress={() => {
              this.setState({
                isShow: !this.state.isShow,
              });
            }}
          >
            <View style={ListItemBalanceStyles.avatar}>
              <Image style={ListItemBalanceStyles.photo} source={thumbnail} />
            </View>
            <View style={ListItemBalanceStyles.title}>
              <Text style={ListItemBalanceStyles.name}>
                {this.props.data.name}
                <Text style={ListItemBalanceStyles.normal}>
                  {this.props.data.totalBalanceTrip >= 0 ? ' lấy lại ' : ' nợ '}
                </Text>
                <Text
                  style={[
                    ListItemBalanceStyles.money,
                    { color: this.props.data.totalBalanceTrip >= 0 ? Colors.mediumseagreen : Colors.orangered },
                  ]}
                >
                  {this.props.data.totalBalanceTrip >= 0
                    ? number2money(this.props.data.totalBalanceTrip)
                    : number2money(this.props.data.totalBalanceTrip * -1)}{' '}
                  VND
                  <Text style={ListItemBalanceStyles.normal}>{' trong tổng tiền '}</Text>
                </Text>
              </Text>
            </View>
            <View style={ListItemBalanceStyles.icon}>
              <MaterialCommunityIcons
                name={this.state.isShow ? 'unfold-less-horizontal' : 'unfold-more-horizontal'}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.isShow ? (
            <View style={ListItemBalanceStyles.containerSecond}>
              <View style={ListItemBalanceStyles.button}>
                <TouchableOpacity
                  onPress={() => {
                    this.remind();
                  }}
                >
                  <View style={ListItemBalanceStyles.btn}>
                    <Text style={ListItemBalanceStyles.txt}>Nhắc nhở</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.handleResolve()}
                >
                  <View style={ListItemBalanceStyles.btn}>
                    <Text style={ListItemBalanceStyles.txt}>Giải quyết</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
        <View style={ListItemBalanceStyles.lineBottom}></View>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(ListItemBalance);
