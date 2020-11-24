import { screenHeight, screenWidth } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: screenWidth / 10,
    marginVertical: screenWidth / 20,
  },
  reactLogo: {
    width: screenWidth / 1.684,
    height: screenWidth / 4,
    tintColor: Colors.tabIconSelected,
    marginTop: screenWidth / 10,
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: screenWidth / 10,
  },
  userContainer1: {
    flexDirection: 'row',
    marginBottom: screenWidth / 15,
  },
  user: {
    flex: 1,
    marginHorizontal: screenWidth / 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,1)',
    borderBottomWidth: 0.5,
  },
  userName: {
    tintColor: Colors.blackText,
    width: screenWidth / 20,
    height: screenWidth / 20,
  },
  input: {
    flex: 1,
    fontSize: screenWidth / 25,
    marginLeft: screenWidth / 50,
  },
  buttonSignUp: {
    flexDirection: 'row',
    paddingHorizontal: screenWidth / 8,
    marginBottom: screenWidth / 20,
  },
  buttonSignUp1: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth,
    height: screenWidth / 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: screenWidth / 16,
    backgroundColor: Colors.tabIconSelected,
  },
  textSignUp: {
    fontSize: 20,
    color: Colors.white,
  },
  buttonLogin: {
    flexDirection: 'row',
    paddingHorizontal: screenWidth / 8,
    marginBottom: screenWidth / 30,
  },
  buttonLogin1: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth,
    height: screenWidth / 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: screenWidth / 16,
  },
  textLogin: {
    fontSize: 20,
    opacity: 0.7,
  },
});

export default styles;
