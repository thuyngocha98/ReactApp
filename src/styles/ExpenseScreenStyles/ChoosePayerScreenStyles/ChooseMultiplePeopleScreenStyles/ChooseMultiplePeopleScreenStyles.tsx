import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { screenWidth, APPBAR_HEIGHT } from '../../../../constants/Dimensions';
import Colors from '../../../../constants/Colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const ChooseMultiplePeopleScreenStyles = StyleSheet.create({
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
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
  },
  cancel: {
    height: '100%',
    paddingHorizontal: screenWidth / 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  add: {
    fontSize: 16,
    color: Colors.white,
  },
  save: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // flatlist
  flatlist: {
    flex: 1,
  },
  mainFlatlist: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
    marginTop: screenWidth / 27.4,
  },
  containerFlatlist: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtVND: {
    color: Colors.gray,
    fontSize: 15,
  },
  viewInputMoney: {
    flex: 2.5,
    flexDirection: 'row',
  },
  viewVND: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewInput: {
    marginLeft: screenWidth / 72,
    flexDirection: 'column',
    flex: 2.5,
  },
  input: {
    textAlign: 'right',
    fontSize: 18,
  },
  image: {
    width: screenWidth / 8.22,
    height: screenWidth / 8.22,
    borderRadius: screenWidth / 16.44,
  },
  txt: {
    fontSize: 19,
  },
  underLine: {
    marginTop: screenWidth / 27.4,
    width: screenWidth - screenWidth / 10.275,
    height: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightgray,
  },

  // footer
  footer: {
    width: screenWidth,
    height: screenWidth / 4.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.gray,
  },
  line1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyTotal: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '400',
  },
  line2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyLeft: {
    fontSize: 17,
  },
});
export default ChooseMultiplePeopleScreenStyles;
