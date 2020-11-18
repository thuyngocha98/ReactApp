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
import moment from 'moment';
import { screenWidth } from '../../../constants/Dimensions';

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
    console.log(this.props.dataTrip);
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
        <View style={{ flexDirection: 'row' }}>
          <View style={ListItemGroupStyles.dotted1} />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={ListItemGroupStyles.dotted2} />
              <View style={ListItemGroupStyles.circle} />
              <View style={ListItemGroupStyles.member1}>
                <Text style={{ fontSize: screenWidth / 30, opacity: 0.8 }}>
                  Được tạo ngày {moment(this.props.dataTrip.create_date).format('L')}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={ListItemGroupStyles.dotted3} />
              <View style={ListItemGroupStyles.circle1} />
              <View style={ListItemGroupStyles.member2}>
                <Text style={{ fontSize: screenWidth / 30, opacity: 0.8 }}>
                  {' '}
                  {this.props.dataTrip.membersTrip} thành viên ( bạn và {this.props.dataTrip.membersTrip - 1} thành viên
                  khác)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListItemGroup);
