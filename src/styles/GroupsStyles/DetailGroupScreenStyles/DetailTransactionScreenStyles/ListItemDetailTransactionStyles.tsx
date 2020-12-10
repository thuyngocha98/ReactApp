import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../../constants/Dimensions';
import Colors from '../../../../constants/Colors';

const ListItemDetailTransactionStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
    marginTop: screenWidth / 27.4,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: screenWidth/72,
  },
  iconCheck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: screenWidth/7.2,
    height:  screenWidth/7.2,
    borderWidth: 1,
    borderColor: Colors.lavender,
    borderRadius:  screenWidth/14.4,
  },
  title: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  money: {
    fontSize: 16,
  },
  normal: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
  },
  name1: {
    fontWeight: '500',
    fontSize: 15,
  },
  money1: {
    fontSize: 15,
  },
  normal1: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.black,
  },
  // txt: {
  //     fontSize: 18
  // },
  // txt1: {
  //     fontSize: 17
  // },

  underLine: {
    marginTop: screenWidth / 27.4,
    width: screenWidth - screenWidth / 10.275,
    height: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightgray,
    marginBottom: 2,
  },
});
export default ListItemDetailTransactionStyles;
