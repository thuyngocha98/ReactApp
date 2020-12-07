import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth, APPBAR_HEIGHT, screenHeight } from '../../../constants/Dimensions';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const CreateGroupScreenStyles = StyleSheet.create({
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
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: screenWidth / 24,
  },
  cancel: {
    fontSize: 17,
    color: Colors.white,
  },
  addContact: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
    flex: 1,
  },
  add: {
    fontSize: 17,
    color: Colors.white,
  },
  categoryGroupName: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: screenWidth / 20.55,
  },
  iconCamera: {
    width: screenWidth / 5.1375,
    height: screenWidth / 5.1375,
  },
  nameAndDetail: {
    flex: 1,
    marginLeft: screenWidth / 27.4,
  },
  groupName: {
    fontWeight: '500',
    fontSize: 17,
  },
  detail: {
    height: screenWidth / 12,
    paddingVertical: 0,
    fontSize: 16,
    color: Colors.blackText,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  pickDate: {
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
    marginVertical: screenWidth / 50,
  },
  pickDate1: {
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
    marginBottom: screenWidth / 20,
  },
  chooseDay: {
    marginTop: screenWidth / 36,
    backgroundColor: Colors.tintColor,
    height: screenWidth / 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  contentChooseDay: {
    color: Colors.white,
    fontSize: screenWidth / 25,
    opacity: 0.9,
  },
  overlayStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  listTrip: {
    marginTop: screenHeight / 64,
  },
  itemTrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: screenHeight / 72,
  },
  txtTrip: {
    fontSize: 16,
    color: Colors.blackText,
  },
  selectTrip: {
    paddingVertical: screenHeight / 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
});
export default CreateGroupScreenStyles;
