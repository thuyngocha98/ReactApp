import { StyleSheet, Platform } from 'react-native';
import { screenWidth } from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';

const ListItemGroupStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: screenWidth / 20.55,
    marginTop: screenWidth / 41.1,
    paddingBottom: screenWidth / 41.1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgray,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    flex: 1,
    flexDirection: 'row',
    margin: screenWidth / 82.2,
  },
  nameGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: screenWidth / 41.1,
    justifyContent: 'center',
  },
  textDetail: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: screenWidth / 82.2,
  },
  avatar: {
    width: screenWidth / 10.275,
    height: screenWidth / 10.275,
    resizeMode: 'contain',
  },
  avatar1: {
    width: screenWidth / 10.275,
    height: screenWidth / 10.275,
    borderRadius: screenWidth / 6,
    resizeMode: 'cover',
  },
  name: {
    fontWeight: '400',
    fontSize: screenWidth / 25,
    marginBottom: screenWidth / 100,
  },
  linkComment: {
    height: screenWidth / 20,
    marginLeft: -screenWidth / 80,
  },
  linkComment1: {
    height: screenWidth / 10,
    marginLeft: -screenWidth / 80,
  },
  dotted1: {
    height: screenWidth / 6,
    width: 0.6,
    backgroundColor: 'gray',
    marginLeft: screenWidth / 22,
    marginTop: -screenWidth / 130,
  },
  dotted2: {
    height: 0.3,
    width: screenWidth / 10,
    backgroundColor: 'gray',
    marginTop: screenWidth / 29,
  },
  dotted3: {
    height: 0.3,
    width: screenWidth / 10,
    backgroundColor: 'gray',
    marginTop: screenWidth / 20,
  },
  circle: {
    width: screenWidth / 80,
    height: screenWidth / 80,
    backgroundColor: Colors.mediumseagreen,
    borderRadius: screenWidth / 40,
    marginTop: screenWidth / 35,
  },
  circle1: {
    width: screenWidth / 80,
    height: screenWidth / 80,
    backgroundColor: Colors.mediumseagreen,
    borderRadius: screenWidth / 40,
    marginTop: screenWidth / 23,
  },
  member1: {
    marginTop: Platform.OS === 'ios' ? screenWidth / 70 : screenWidth / 90,
    marginLeft: screenWidth / 80,
  },
  member2: {
    marginTop: Platform.OS === 'ios' ? screenWidth / 40 : screenWidth / 40,
    marginLeft: screenWidth / 160,
  },
});
export default ListItemGroupStyles;
