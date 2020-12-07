import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { screenWidth, APPBAR_HEIGHT } from '../../../../constants/Dimensions';
import Colors from '../../../../constants/Colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const DetailTransactionScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerHeader: {
    width: screenWidth,
    height: APPBAR_HEIGHT + getStatusBarHeight(),
    backgroundColor: Colors.tabIconSelected,
  },
  header: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: screenWidth / 27.43,
  },
  addContact: {
    flex: 7,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  cancel: {
    flex: 1,
  },
  add: {
    fontSize: 17,
    color: Colors.white,
  },
  save1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  save2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleDetails: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginTop: -5,
  },
  icons: {},
  image1: {
    width: screenWidth / 6,
    height: screenWidth / 6,
    resizeMode: 'cover',
    borderRadius: screenWidth / 12,
  },
  image2: {
    width: screenWidth / 6,
    height: screenWidth / 6,
    resizeMode: 'cover',
  },
  details: {
    marginLeft: screenWidth / 20,
    marginTop: screenWidth / 20,
    marginBottom: screenWidth / 30,
  },
  contentDetails: {
    marginLeft: screenWidth / 20,
  },
  iconTravel: {
    fontSize: 20,
  },
  money: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  camera: {
    marginTop: -5,
    flex: 2,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#969696',
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 5,
  },
  nameGroup: {
    flexDirection: 'row',
    borderRadius: screenWidth / 20.55,
    borderWidth: 1,
    borderColor: Colors.lightgray,
    alignItems: 'center',
  },
  image: {
    width: screenWidth / 10.275,
    height: screenWidth / 10.275,
    tintColor: Colors.tintColor,
    borderColor: Colors.lightgray,
  },
  txtAllOf: {
    paddingHorizontal: screenWidth / 41.1,
    fontSize: 17,
  },
  personAdd: {
    flex: 9,
    marginTop: 5,
  },
  person: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  hr: {
    marginTop: 15,
    marginHorizontal: screenWidth / 15,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
  },
});
export default DetailTransactionScreenStyles;
