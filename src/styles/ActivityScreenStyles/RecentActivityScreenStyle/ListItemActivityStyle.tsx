import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  size: {
    fontSize: 16,
  },
  color: {
    color: Colors.mediumseagreen,
    fontSize: 16,
  },
  time: {
    fontSize: 14,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: screenWidth / 20.55,
  },
  container1: {
    marginRight: screenWidth / 27.4,
  },
  toast: {
    width: screenWidth / 10.275,
    height: screenWidth / 10.275,
    borderRadius: screenWidth / 20.55,
    resizeMode: 'cover',
  },
  avatar: {
    width: screenWidth / 20.55,
    height: screenWidth / 20.55,
    borderRadius: screenWidth / 41.1,
    resizeMode: 'cover',
    marginTop: -screenWidth / 27.4,
    marginLeft: screenWidth / 16.44,
  },
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightgray,
    marginVertical: screenWidth / 27.4,
  },
});

export default styles;
