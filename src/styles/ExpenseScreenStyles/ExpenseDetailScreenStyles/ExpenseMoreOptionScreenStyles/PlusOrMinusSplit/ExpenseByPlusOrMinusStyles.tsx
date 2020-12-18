import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { screenWidth, APPBAR_HEIGHT, screenHeight } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const ExpenseByPlusOrMinusStyles = StyleSheet.create({
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
  save: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  paidBy: {
    flexDirection: 'row',
    marginHorizontal: screenWidth / 41.1,
  },
  imageAvatar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: screenWidth / 41.1,
  },
  avatar: {
    width: screenWidth / 8.935,
    height: screenWidth / 8.935,
    borderRadius: screenWidth / 17.87,
  },
  content: {
    flex: 4.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt2: {
    flex: 1,
  },
  contentLeft: {
    flex: 5.5,
    flexDirection: 'row',
  },
  iconCheck: {
    paddingRight: screenWidth/72,
  },
  iconRight: {
    paddingRight: screenWidth / 54,
    paddingLeft: screenWidth/72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  underLineInput: {
    width: screenWidth,
    height: 1,
    backgroundColor: Colors.lightgray,
  },
  contentSplit: {
    flexDirection: 'column',
    marginVertical: screenWidth / 13.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontSize: 17,
    fontWeight: '500',
  },
  title2: {
    fontSize: 16,
  },
  categorySelectTypeSplit: {
    flexDirection: 'row',
    marginHorizontal: screenWidth / 41.1,
    marginVertical: screenWidth / 41.1,
  },
  itemSelect: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightgray,
  },
  txtSelect: {
    fontSize: 25,
    paddingHorizontal: screenWidth / 27.4,
    paddingVertical: screenWidth / 82.2,
    textAlign: 'center',
    marginHorizontal: screenWidth / 82.2,
  },
  categoryTypeGroup: {
    flexDirection: 'row',
    margin: screenWidth / 20.55,
  },
  equal: {
    padding: screenWidth / 82.2,
    borderWidth: 1,
    borderRightWidth: -1,
    borderColor: Colors.tintColor,
    borderTopLeftRadius: screenWidth / 82.2,
    borderBottomLeftRadius: screenWidth / 82.2,
    textAlign: 'center',
    fontSize: 25,
  },
  number: {
    flex: 1,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRightWidth: -1,
    borderColor: Colors.tintColor,
    textAlign: 'center',
    fontSize: 20,
  },
  plusOrMinus: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: Colors.tintColor,
    borderTopRightRadius: screenWidth / 82.25,
    borderBottomRightRadius: screenWidth / 82.2,
    fontSize: 18,
  },
  flatlist: {
    flex: 1,
  },
  viewTabBar: {
    borderColor: Colors.lightgray,
    elevation: 2,
    borderTopWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    flexDirection: 'row',
    margin: screenWidth / 27.4,
  },
  contentBar: {
    flex: 3.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyOf: {
    fontSize: 17,
    fontWeight: '500',
  },
  totalMoney: {
    fontSize: 13,
  },
  categoryList: {
    flex: 1,
    flexDirection: 'column',
  },
  flatlist1: {
    marginBottom: screenHeight/56,
  },
  viewTitle: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  txtTitle: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: screenHeight/216,
  },
  txtTitle1: {
    fontSize: 13,
    color: Colors.gray,
  },
  txtTitleList1: {
    fontSize: 14,
    color: Colors.black,
    paddingLeft: screenWidth/20,
  },
  line: {
    alignSelf: 'center',
    height: 2, 
    width: screenWidth/18, 
    backgroundColor: Colors.lavender
  },
  flatlist2: {
    flex: 1,
  },
  flatlistMember: {
    flexDirection: 'column',
    marginLeft: screenWidth / 82.5,
  },
  listMember: {
    flexDirection: 'row',
    marginRight: screenWidth / 41.1,
    paddingVertical: screenHeight/108,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lavender,
  },

  // flatlist 1
  mainFlatlist: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
  },
  containerFlatlist: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenHeight/56,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lavender,
  },
  avatar1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: screenWidth/36,
  },
  name: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtVND: {
    color: Colors.gray,
    fontSize: 13,
  },
  viewInputMoney: {
    flex: 2,
    flexDirection: 'row',
  },
  viewVND: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth/72,
  },
  viewInput: {
    flexDirection: 'column',
    flex: 1,
    marginRight: screenWidth/36,
  },
  input: {
    textAlign: 'right',
    fontSize: 18,
    flex: 1,
  },
  image: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: screenWidth / 20,
  },
  txt: {
    fontSize: 15,
  },
  underLine: {
    marginTop: screenWidth / 80,
    width: screenWidth - screenWidth / 10.275,
    height: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightgray,
  },
  delete: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default ExpenseByPlusOrMinusStyles;
