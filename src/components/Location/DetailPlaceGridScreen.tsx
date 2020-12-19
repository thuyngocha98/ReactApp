import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { BASEURL } from '../../api/api';
import { screenWidth } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { thumbnails } from '../../constants/FunctionCommon';

type Props = {
  data?: {
    author?: {
      email?: string,
      avatar?: any,
    }
    amountTransaction?: number,
    nameTransaction?: string,
    address?: string,
    imageURL?: any[],
  };
};

type States = {};

class DetailPlaceGridScreen extends Component<Props, States> {
  render() {
    const { data } = this.props;
    const thumbnail =
      this.props.data?.author?.avatar && this.props.data?.author?.avatar.length > 2
        ? { uri: `${BASEURL}/images/avatars/${this.props.data?.author?.avatar}` }
        : thumbnails['avatar' + this.props.data?.author?.avatar];
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.userEven}>
            <View style={styles.viewAvatar}>
              <Image style={styles.avatar} source={thumbnail} />
            </View>
            <View style={styles.user}>
              <Text>{data?.author?.email}</Text>
              <Text style={{ fontSize: screenWidth / 35, color: Colors.mediumseagreen }}>
                ( Thành viên ghi lại thông tin )
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dotted1} />
            <View style={{ flex: 1 }}>
              <View style={styles.expense}>
                <View style={styles.dotted2} />
                <View style={styles.circle} />
                <View />
                <View style={styles.expense1}>
                  <Text style={{ fontWeight: 'bold' }}>Giao dịch:</Text>
                  <Text>
                    {data?.amountTransaction > 0
                      ? ` ${data?.nameTransaction} - ${data?.amountTransaction} VNĐ`
                      : ` Không thực hiện giao dịch.`}
                  </Text>
                </View>
              </View>
              <View style={styles.place}>
                <View style={styles.dotted2} />
                <View style={styles.circle} />
                <View style={styles.place1}>
                  <Text style={{ fontWeight: 'bold' }}>Địa điểm:</Text>
                  <Text style={{ flex: 1 }}> {data?.address}.</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.showImage}>
            <FlatList
              data={data?.imageURL}
              renderItem={({ item }) => (
                <Image source={{ uri: `${BASEURL}/images/uploads/${item}` }} style={styles.image} />
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.hr} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    marginLeft: screenWidth / 40,
    marginTop: screenWidth / 60,
  },
  container: {
    backgroundColor: Colors.white,
    paddingLeft: screenWidth / 30,
    paddingTop: screenWidth / 30,
  },
  viewAvatar: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: screenWidth / 6.8,
    marginTop: screenWidth / 54.8,
    borderWidth: 0.5,
    borderColor: Colors.lightgray,
    backgroundColor: Colors.lightgray,
  },
  avatar: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: screenWidth / 6.8,
    resizeMode: 'cover',
  },
  userEven: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showImage: {
    flexDirection: 'row',
    marginLeft: screenWidth / 30,
    marginTop: screenWidth / 20,
  },
  image: {
    marginTop: screenWidth / 72,
    marginRight: screenWidth / 35,
    resizeMode: 'stretch',
    width: screenWidth / 3.7,
    height: screenWidth / 3.7,
    borderRadius: 8,
    marginBottom: screenWidth / 70,
    borderWidth: 0.5,
    borderColor: Colors.lightgray
  },
  hr: {
    width: screenWidth,
    height: 1,
    backgroundColor: Colors.lightgray,
    marginTop: screenWidth / 30,
  },
  dotted1: {
    height: screenWidth / 6,
    width: 0.3,
    backgroundColor: 'black',
    marginLeft: screenWidth / 22,
  },
  dotted2: {
    height: 0.3,
    width: screenWidth / 10,
    backgroundColor: 'black',
  },
  circle: {
    width: screenWidth / 80,
    height: screenWidth / 80,
    backgroundColor: Colors.mediumseagreen,
    borderRadius: screenWidth / 40,
    marginTop: -2.5,
  },
  expense: {
    flexDirection: 'row',
    marginTop: screenWidth / 25,
  },
  expense1: {
    flexDirection: 'row',
    marginLeft: screenWidth / 120,
    marginTop: -screenWidth / 50,
  },
  place: {
    flexDirection: 'row',
    marginTop: screenWidth / 20,
  },
  place1: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: screenWidth / 120,
    marginTop: -screenWidth / 50,
  },
});

export default DetailPlaceGridScreen;
