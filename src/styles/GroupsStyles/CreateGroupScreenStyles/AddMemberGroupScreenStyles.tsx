import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth, screenHeight } from '../../../constants/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    paddingTop: screenWidth / 10.275,
    paddingHorizontal: screenWidth / 27.4,
  },
  cancel: {
    fontSize: 17,
    color: Colors.white,
  },
  addFriends: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
    flex: 1,
  },
  next: {
    fontSize: 17,
    color: Colors.white,
  },
  input: {
    marginTop: screenWidth / 27.4,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: screenWidth / 27.4,
    padding: screenWidth / 58.71,
    borderRadius: 5,
    marginBottom: screenWidth / 27.4,
  },
  input1: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: screenWidth / 27.4,
    padding: screenWidth / 58.71,
    borderRadius: 5,
    marginBottom: screenWidth / 40,
  },
  iconSearch: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewHeader: {
    zIndex: 1, 
    backgroundColor: Colors.tabIconSelected,
  },
  viewContent: {
    flex: 1,
    marginHorizontal: screenWidth / 20.55,
    marginTop: screenWidth / 82.2,
  },
  viewEmail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.lightgray,
    borderBottomWidth: 0.5,
  },
  nameAndMail: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: screenWidth / 41.1,
  },
  textEmail: {
    fontSize: 15.5,
    color: Colors.tintColor,
  },
  textName: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.blackText,
  },
  popupList: {
    zIndex: 20,
    alignSelf: 'center',
    width: screenWidth - screenWidth / 15,
    top: screenWidth / 3.1615,
    position: 'absolute',
    backgroundColor: 'transparent',
    maxHeight: screenHeight/3,
  },
  userExists: {
    zIndex: 20,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: screenWidth / 82.2,
  },
  username: {
    color: Colors.black,
    fontSize: 17,
  },
  email: {
    color: Colors.tintColor,
    fontSize: 16,
  },
  txtChooseLeader: {
    marginTop: screenWidth / 60,
    marginHorizontal: screenWidth / 31.6,
    color: Colors.black,
    fontSize: 14,
    textAlign: 'center',
  },
  activityIndicator: {
    zIndex: 30,
    position: 'absolute',
    marginTop: screenHeight / 2,
    left: 0,
    right: 0,
  },
  viewBtn: {
    marginHorizontal: screenWidth / 3.5,
    marginBottom: screenWidth / 40,
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: screenWidth / 40,
    borderRadius: 5,
  },
  txtAddMember: {
   color: 'rgba(128,128,128,0.8)', 
   fontSize: 15, 
   fontWeight: 'bold', 
   textAlign: 'center',
  }
});
export default styles;
