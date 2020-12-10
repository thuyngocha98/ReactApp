import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenHeight, screenWidth } from '../../../constants/Dimensions';
import Constants from 'expo-constants';

const DetailGroupScreenStyles = StyleSheet.create({
  mainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  // modal delete
  mainDeleteModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewDeleteModal: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: screenWidth / 36,
  },
  txtTitleDeleteModal: {
    fontSize: 16,
    color: Colors.blackText,
    paddingBottom: screenWidth / 36,
    paddingHorizontal: screenWidth / 11,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lavender,
  },
  viewItemDeleteModal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnDeleteModal: {
    flexDirection: 'row',
  },
  txtBtnDeleteModal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.blackText,
    textAlign: 'center',
    paddingVertical: screenWidth / 36,
  },
  btnDeleteModal: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // modal create new
  viewModal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: screenWidth / 36,
  },
  viewItemModal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtItemModal: {
    marginTop: screenWidth / 72,
    marginBottom: screenWidth / 36,
    fontSize: 13,
  },
  headerRight: {
    marginRight: screenWidth / 20.57,
    marginTop: screenWidth / 41.14,
  },
  textHeaderRight: {
    fontSize: 17,
    color: Colors.white,
  },
  headerLeft: {
    marginLeft: screenWidth / 27.43,
    marginTop: screenWidth / 41.14,
  },
  textHeaderLeft: {
    fontSize: 17,
    color: Colors.white,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: screenWidth / 1.6456 + Constants.statusBarHeight,
  },
  dateTitle: {
    backgroundColor: Colors.tintColor,
  },
  date: {
    margin: screenWidth / 41.14,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: screenWidth / 6,
  },
  viewLottie: {
    width: screenWidth / 3.6,
    height: screenWidth / 3.6,
  },
  addTrip: {
    position: 'absolute',
    bottom: screenHeight / 108,
    right: screenWidth / 72,
    width: screenWidth / 7.5,
    height: screenWidth / 7.5,
    borderRadius: screenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.tintColor,
  },
  overView: {
    flexDirection: 'row',
    height: screenWidth / 6.2,
    alignItems: 'center',
    marginVertical: screenWidth / 40,
    marginHorizontal: screenWidth / 40,
    borderRadius: 5,
    paddingHorizontal: screenWidth / 40,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageOverView: {
    width: screenWidth / 18,
    height: screenWidth / 18,
    resizeMode: 'cover',
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DetailGroupScreenStyles;
