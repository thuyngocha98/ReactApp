import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";
import  Constants  from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: screenWidth,
        height: screenWidth / 1.6456 + Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode:'cover'
    },
    header: {
        width: screenWidth,
        margin: screenWidth/41.14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnBack: {
        marginLeft: screenWidth/27.43,
    },
    btnSetting: {
        marginRight: screenWidth/27.43,
    },
    iconUser: {
        marginTop: screenWidth/82.28,
        width: screenWidth/5.1425,
        height: screenWidth / 5.1425,
        tintColor: Colors.blackText,
        alignSelf: 'center'
    },
    contentText: {
        width: screenWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    numberPeopleAndTime: {
        marginBottom: screenWidth / 41.14,
        fontSize: 14,
    },
    owesAndMoney: {
        flexDirection: 'row',
        marginBottom: screenWidth/41.14,
    },
    owes: {
        fontSize: 16,
    },
    money: {
        fontSize: 17,
        fontWeight: '500'
    },
    flatList: {
        // backgroundColor: '#696969',
        height: screenWidth/7.48,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default styles;
