import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemDetailTransactionStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailTransactionScreenStyles/ListItemDetailTransactionStyles';
import { View, Image, Text } from 'react-native';
import Colors from '../../../../constants/Colors';
import { thumbnails, number2money } from '../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../api/api';

function mapStateToProps(state) {
  return {};
}

type Props = {
  data?: {
    user_id?: any,
    type?: number,
    total?: number,
  };
};

class ListItemDetailTransaction extends Component<Props> {
  render() {
    const thumbnail =
      this.props.data.user_id.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${this.props.data.user_id.avatar}` }
        : thumbnails['avatar' + this.props.data.user_id.avatar];
    return (
      <View style={ListItemDetailTransactionStyles.mainContainer}>
        <View style={ListItemDetailTransactionStyles.container}>
          <View style={ListItemDetailTransactionStyles.avatar}>
            <Image style={ListItemDetailTransactionStyles.image} source={thumbnail} />
          </View>
          <View style={ListItemDetailTransactionStyles.title}>
            {this.props.data.type > 0 ? (
              <View style={ListItemDetailTransactionStyles.title1}>
                <Text style={ListItemDetailTransactionStyles.name}>
                  {this.props.data.user_id.name}
                  <Text style={ListItemDetailTransactionStyles.normal}>{' đã thanh toán '}</Text>
                  <Text style={[ListItemDetailTransactionStyles.money, { color: Colors.mediumseagreen }]}>
                    {number2money(this.props.data.type)} VND
                  </Text>
                </Text>
                <Text style={ListItemDetailTransactionStyles.name1}>
                  {'(' + this.props.data.user_id.name}
                  <Text style={ListItemDetailTransactionStyles.normal1}>
                    {this.props.data.total >= 0 ? ' lấy lại ' : ' nợ '}
                  </Text>
                  <Text
                    style={[
                      ListItemDetailTransactionStyles.money1,
                      { color: this.props.data.total >= 0 ? Colors.mediumseagreen : Colors.orangered },
                    ]}
                  >
                    {this.props.data.total >= 0
                      ? number2money(this.props.data.total)
                      : number2money(this.props.data.total * -1)}{' '}
                    VND
                  </Text>
                  <Text>{`)`}</Text>
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={ListItemDetailTransactionStyles.name}>
                  {this.props.data.user_id.name}
                  <Text style={ListItemDetailTransactionStyles.normal}>{' nợ '}</Text>
                  <Text style={[ListItemDetailTransactionStyles.money, { color: Colors.orangered }]}>
                    {number2money(this.props.data.total * -1)} VND
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={ListItemDetailTransactionStyles.underLine} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListItemDetailTransaction);
