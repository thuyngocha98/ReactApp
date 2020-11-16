import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import ListItemGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/ListItemGroupStyles';
import Colors from '../../../constants/Colors';
import { FontAwesome5, Entypo, Octicons } from '@expo/vector-icons';
import ListItemDetail from './ListItemDetail';
import { number2money } from '../../../constants/FunctionCommon';
import { BASEURL } from '../../../api/api';
import ListItemFriendsOwe from '../../FriendsScreen/MainFriendsOweScreen/ListItemFriendsOwe';

function mapStateToProps(state) {
  return {};
}

type Props = {
  nameGroup?: string;
  detail?: string;
  price?: string;
  isOwned?: boolean;
  data?: any[];
  dataTrip?: any;
};

class ListItemGroup extends Component<Props> {
  render() {
    const lengthAvatar = this.props.dataTrip.avatarGroup.length;
    const avatar =
      lengthAvatar > 2
        ? { uri: `${BASEURL}/images/avatarsGroup/${this.props.dataTrip.avatarGroup}` }
        : {
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png',
          };
    var money = this.props.price;
    if (parseInt(money) < 0) {
      money = money.toString().replace('-', '');
    }
    money = number2money(money);
    return (
      <View style={ListItemGroupStyles.mainContainer}>
        <View style={ListItemGroupStyles.container1}>
          <Image style={lengthAvatar > 2 ? ListItemGroupStyles.avatar1 : ListItemGroupStyles.avatar} source={avatar} />
          <View style={ListItemGroupStyles.texts}>
            <View style={ListItemGroupStyles.nameGroup}>
              <Text style={ListItemGroupStyles.name}>{this.props.nameGroup}</Text>
            </View>
            <View style={ListItemGroupStyles.textDetail}>
              <Text style={{ color: this.props.isOwned ? Colors.mediumseagreen : Colors.orangered }}>
                {this.props.isOwned ? 'Bạn lấy lại' : 'Bạn nợ'}
              </Text>
              <Text style={{ color: this.props.isOwned ? Colors.mediumseagreen : Colors.orangered }}>{money} VND</Text>
            </View>
          </View>
          <Octicons name="chevron-right" size={25} color={Colors.lightgray} />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListItemGroup);
