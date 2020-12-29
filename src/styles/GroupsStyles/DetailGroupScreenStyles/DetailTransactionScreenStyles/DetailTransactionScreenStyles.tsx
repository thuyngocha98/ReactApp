import { StyleSheet } from 'react-native';
import { screenWidth, APPBAR_HEIGHT, screenHeight } from '../../../../constants/Dimensions';
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
    opacity: 0.4
  },
  save2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    opacity: 0.4
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
    borderWidth: 1,
    borderColor: Colors.lavender,
    borderRadius: screenWidth / 12,
  },
  image2: {
    width: screenWidth / 6,
    height: screenWidth / 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lavender,
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
    fontSize: 18,
  },
  money: {
    fontWeight: 'bold',
    fontSize: 24,
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
    borderRadius: screenWidth / 20.55,
    width: screenWidth / 10.275,
    height: screenWidth / 10.275,
    tintColor: Colors.tintColor,
    borderWidth: 1,
    borderColor: Colors.lightgray,
  },
  txtAllOf: {
    paddingHorizontal: screenWidth / 36,
    fontSize: 16,
    lineHeight: screenWidth / 10.275,
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
  viewAddress: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingVertical: screenWidth / 24,
    paddingHorizontal: screenWidth / 24,
    marginTop: -2,
  },
  txtTitle: { 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  viewImages: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingVertical: screenWidth / 24,
    paddingHorizontal: screenWidth / 24,
    marginBottom: screenHeight/56,
  },
  listImages: {
    resizeMode: 'cover',
    marginRight: screenWidth/36,
    width: screenWidth / 3,
    height: screenWidth / 4,
    borderRadius: 8,
  },
  viewDropModalZoom: {
    zIndex: 10,
    backgroundColor: Colors.lightgray,
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: screenWidth / 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: screenWidth / 36,
    top: screenWidth / 36,
  },
  viewTextAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lottieMap: {
    width: screenWidth/10,
    height: screenWidth/10,
  },
  viewLottie: {
    width: screenWidth/10,
    height: screenWidth/10,
  },
  txtAddress: {
    flex: 1,
    marginHorizontal: screenWidth/36,
    fontSize: 15, 
    color: Colors.gray,
  },
  viewFlatList: {
    paddingLeft: screenWidth / 36,
    marginTop: screenWidth / 72,
  },
  txtDate: { 
    fontSize: 14, 
    marginBottom: screenWidth/72, 
    opacity: 0.5 
  }
});
export default DetailTransactionScreenStyles;
