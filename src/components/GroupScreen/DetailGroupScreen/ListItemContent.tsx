import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import ListItemContentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/ListItemContentStyles';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { BASEURL } from '../../../api/api';
import { transaction } from '../../../constants/FunctionCommon';
import { screenWidth } from '../../../constants/Dimensions';

function mapStateToProps(state) {
  return {
    userID: state.dataUser.dataUser._id,
  };
}

type Props = {
  userID: any;
  title?: string;
  detail?: string;
  titleMoney?: string;
  money?: string;
  data?: any;
};

class ListItemContent extends PureComponent<Props> {
  calculateMoney() {
    const arrayUser = this.props.data.list_user;
    let money = 0;
    for (let i = 0; i < arrayUser.length; i++) {
      if (arrayUser[i].user_id === this.props.userID) {
        if (arrayUser[i].type > 0) {
          money = arrayUser[i].type - arrayUser[i].amount_user;
        } else {
          money = arrayUser[i].type * arrayUser[i].amount_user;
        }
      }
    }
    return money;
  }

  render() {
    const lengthImage = this.props.data.imageURL.length;

    const avatarTransaction =
      lengthImage > 0
        ? { uri: `${BASEURL}/images/uploads/${this.props.data.imageURL[0]}` }
        : transaction['avatar' + this.props.data.avatar];
    const timeDay = this.props.data.create_date.split(/[\s-T]+/);
    const time = timeDay[3].split('.').shift();
    return (
      <View style={ListItemContentStyles.mainContainer}>
        <View style={ListItemContentStyles.container}>
          <View style={ListItemContentStyles.time}>
            <Text style={ListItemContentStyles.day}>{timeDay[2]}</Text>
            <Text style={ListItemContentStyles.month}>Tháng {timeDay[1]}</Text>
          </View>
          <View style={ListItemContentStyles.iconTitle}>
            <Image
              source={avatarTransaction}
              style={lengthImage > 0 ? ListItemContentStyles.image1 : ListItemContentStyles.image}
            />
          </View>
          <View style={ListItemContentStyles.content}>
            <Text style={ListItemContentStyles.title}>{this.props.data.name}</Text>
            <Text style={ListItemContentStyles.detail} numberOfLines={1}>
              {time}
            </Text>
          </View>
          <View style={ListItemContentStyles.totalMoney}>
            <MaterialIcons
              name={'note-add'}
              color={this.props.data?.moneyPayer ? Colors.tintColor : Colors.white}
              size={16}
            />
            <MaterialIcons
              name={'add-location'}
              color={this.props.data?.address ? Colors.splitWise : Colors.white}
              size={16}
              style={{ marginHorizontal: screenWidth / 20 }}
            />
            <MaterialIcons
              name={'library-add'}
              color={this.props.data?.imageURL.length > 0 ? Colors.mediumseagreen : Colors.white}
              size={16}
            />
          </View>
          <View style={ListItemContentStyles.iconDetail}>
            <Octicons name="chevron-right" size={25} color={Colors.lightgray} />
          </View>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListItemContent);
