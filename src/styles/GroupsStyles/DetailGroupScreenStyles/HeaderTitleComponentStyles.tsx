import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenHeight, screenWidth } from '../../../constants/Dimensions';
import Constants from 'expo-constants';

const HeaderTitleComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: screenHeight / 18,
    width: screenWidth,
    margin: screenWidth / 41.14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnBack: {
    marginLeft: screenWidth / 27.43,
    paddingRight: 20,
    paddingLeft: 5,
    paddingBottom: 15,
  },
  btnSetting: {
    marginRight: screenWidth / 27.43,
  },
  iconCamera: {
    width: screenWidth / 5.1425,
    height: screenWidth / 5.1425,
    tintColor: Colors.white,
    alignSelf: 'center',
  },
  iconCamera1: {
    width: screenWidth / 5.1425,
    height: screenWidth / 5.1425,
    alignSelf: 'center',
    borderRadius: screenWidth / 10,
  },
  contentText: {
    width: screenWidth,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: screenWidth / 15,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.white,
    marginLeft: -screenWidth / 41.1,
  },
  numberPeopleAndTime: {
    marginBottom: screenWidth / 100,
    fontSize: 14,
    color: Colors.white,
  },
  owesAndMoney: {
    flexDirection: 'row',
    marginBottom: screenWidth / 60,
  },
  owes: {
    fontSize: 16,
    color: Colors.white,
  },
  money: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.white,
  },
  flatList: {
    backgroundColor: '#696969',
    height: screenWidth / 7.48,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startEndDay: {
    fontSize: 12,
    color: Colors.white,
  },
});
export default HeaderTitleComponentStyles;
