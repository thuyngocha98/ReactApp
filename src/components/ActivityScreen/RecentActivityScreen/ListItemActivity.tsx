import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../../styles/ActivityScreenStyles/RecentActivityScreenStyle/ListItemActivityStyle';
import Colors from '../../../constants/Colors';
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from '../../../../assets/images/toast.png';
// @ts-ignore
import beach from '../../../../assets/images/beach.png';
// @ts-ignore
import puzzle from '../../../../assets/images/puzzle.png';
// @ts-ignore
import update from '../../../../assets/images/system-update.png';
// @ts-ignore
import remove from '../../../../assets/images/remove.png';
import { thumbnails, number2money } from '../../../constants/FunctionCommon';
import { connect } from 'react-redux';
import { BASEURL } from '../../../api/api';
import moment from 'moment';
import localization from 'moment/locale/vi';
moment.updateLocale("vi", localization);

function mapStateToProps(state) {
  return {
    user: state.dataUser.dataUser,
  };
}

type Props = {
  data?: {
    type?: string,
    user_id?: {
      avatar?: any,
      name: string,   
    }
    create_date?: any,
    delete_date?: any,
    update_date?: any,
    trip_id?: {
      name?: string,
    },
    transaction_id?: {
      name?: string,
      amount?: number,
    }
  };
};

class ListItemActivity extends PureComponent<Props> {
  render() {
    if (this.props.data.type === 'created_trip') {
      const thumbnail =
        this.props.data.user_id.avatar.length > 2
          ? { uri: `${BASEURL}/images/avatars/${this.props.data.user_id.avatar}` }
          : thumbnails['avatar' + this.props.data.user_id.avatar];
      const date = this.props.data.create_date;
      var name = this.props.data.user_id.name.split(/[\s ]+/);
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.container1}>
              <Image style={styles.toast} source={beach} />
              <Image style={styles.avatar} source={thumbnail} />
            </View>
            <View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>
                  {name[name.length - 1]} {this.props.data.user_id.name[0]}.{' '}
                </Text>
                <Text style={[styles.size, { color: Colors.mediumseagreen }]}>đã tạo</Text>
                <Text style={styles.size}> nhóm </Text>
                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
              </View>
              <View>
                <View style={styles.flexRow}>
                  <Text style={styles.time}>
                    {`ngày ${moment(date).format('LLL')}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      );
    } else if (this.props.data.type === 'created_transaction') {
      const thumbnail =
        this.props.data.user_id.avatar.length > 2
          ? { uri: `${BASEURL}/images/avatars/${this.props.data.user_id.avatar}` }
          : thumbnails['avatar' + this.props.data.user_id.avatar];
      const date = this.props.data.create_date;
      var name = this.props.data.user_id.name.split(/[\s ]+/);
      var nameTransaction = this.props.data.transaction_id.name;
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.container1}>
              <Image style={styles.toast} source={puzzle} />
              <Image style={styles.avatar} source={thumbnail} />
            </View>
            <View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>
                  {name[name.length - 1]} {this.props.data.user_id.name[0]}.{' '}
                </Text>
                <Text style={styles.size}> đã thêm </Text>
                <Text style={styles.bold}>{nameTransaction} </Text>
                <Text style={styles.size}>in </Text>
                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
              </View>
              <View>
                <View style={styles.flexRow}>
                  <Text style={{ color: Colors.mediumseagreen }}>
                    Tổng tiền {number2money(this.props.data.transaction_id.amount)} VND
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.time}>
                    {`ngày ${moment(date).format('LLL')}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hr}></View>
        </View>
      );
    } else if (this.props.data.type === 'deleted_trip') {
      const thumbnail =
        this.props.data.user_id.avatar.length > 2
          ? { uri: `${BASEURL}/images/avatars/${this.props.data.user_id.avatar}` }
          : thumbnails['avatar' + this.props.data.user_id.avatar];
      const date = this.props.data.delete_date;
      var name = this.props.data.user_id.name.split(/[\s ]+/);
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.container1}>
              <Image style={styles.toast} source={remove} />
              <Image style={styles.avatar} source={thumbnail} />
            </View>
            <View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>
                  {name[name.length - 1]} {this.props.data.user_id.name[0]}.{' '}
                </Text>
                <Text style={[styles.size, { color: Colors.orangered }]}>đã xóa</Text>
                <Text style={styles.size}> nhóm </Text>
                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
              </View>
              <View>
                <View style={styles.flexRow}>
                  <Text style={styles.time}>
                    {`ngày ${moment(date).format('LLL')}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      );
    } else if (this.props.data.type === 'updated') {
      const thumbnail =
        this.props.data.user_id.avatar.length > 2
          ? { uri: `${BASEURL}/images/avatars/${this.props.data.user_id.avatar}` }
          : thumbnails['avatar' + this.props.data.user_id.avatar];
      const date = this.props.data.update_date;
      var name = this.props.data.user_id.name.split(/[\s ]+/);
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.container1}>
              <Image style={styles.toast} source={update} />
              <Image style={styles.avatar} source={thumbnail} />
            </View>
            <View style={{ flex: 7 }}>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>
                  {name[name.length - 1]} {this.props.data.user_id.name[0]}.{' '}
                </Text>
                <Text style={[styles.size, { color: 'purple' }]}>sửa tên</Text>
                <Text style={styles.size}> nhóm thành </Text>
                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
              </View>
              <View>
                <View style={styles.flexRow}>
                  <Text style={styles.time}>
                    {`ngày ${moment(date).format('LLL')}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

export default connect(mapStateToProps, null)(ListItemActivity);
