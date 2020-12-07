import { CONTACTS } from 'expo-permissions';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenHeight, screenWidth } from '../../../constants/Dimensions';

const MainScreenGroupStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  group: {
    marginLeft: screenWidth / 20.55,
    marginTop: screenWidth / 60,
    fontWeight: '500',
    fontSize: 25,
    opacity: 0.5,
  },
  cartExpense: {
    flexDirection: 'row',
    height: screenWidth / 5.1375,
    backgroundColor: Colors.tintColor,
    marginHorizontal: screenWidth / 20.55,
    marginTop: screenWidth / 40,
    borderRadius: screenWidth / 35,
    alignItems: 'center',
  },
  avatar: {
    width: screenWidth / 6.85,
    height: screenWidth / 6.85,
    resizeMode: 'cover',
    borderRadius: screenWidth / 13.7,
    marginLeft: screenWidth / 27.4,
  },
  text: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: screenWidth / 41.1,
  },
  email: {
    color: Colors.white,
    fontSize: screenWidth / 30,
  },
  textTotal: {
    color: Colors.white,
    fontSize: screenWidth / 25,
    marginBottom: screenWidth / 100,
  },
  textDetail: {
    color: Colors.white,
    fontSize: 16,
  },
  menu: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  viewLottie: {
    width: screenWidth / 3.6,
    height: screenWidth / 3.6,
  },
  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 6,
  },
});
export default MainScreenGroupStyles;
