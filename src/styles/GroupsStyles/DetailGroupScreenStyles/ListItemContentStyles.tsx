import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';

const ListItemContentStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    margin: screenWidth / 41.14,
  },
  time: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  month: {},
  day: {},
  iconTitle: {
    marginHorizontal: screenWidth / 20,
  },
  image: {
    height: screenWidth / 12,
    width: screenWidth / 12,
  },
  image1: {
    height: screenWidth / 12,
    width: screenWidth / 12,
    borderRadius: screenWidth / 24,
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: screenWidth / 25,
    fontWeight: '400',
  },
  detail: {
    fontSize: screenWidth / 30,
    color: Colors.gray,
  },
  totalMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: screenWidth / 20,
  },
  titleMoney: {
    fontSize: screenWidth / 30,
  },
  money: {
    fontSize: screenWidth / 30,
    fontWeight: '400',
  },
  iconDetail: {
    justifyContent: 'center',
  },
});
export default ListItemContentStyles;
