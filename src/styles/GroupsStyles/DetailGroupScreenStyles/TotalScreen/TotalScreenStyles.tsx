import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../../../../constants/Colors";
import { screenWidth } from "../../../../constants/Dimensions";

const TotalScreenStyles = StyleSheet.create({
    headerLeft: {
        marginLeft: screenWidth / 27.43,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    headerRight: {
        marginRight: screenWidth / 27.43,
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 20
    },
    title: {
        marginBottom: 20,
    },
    nameGroup: {
        fontSize: 20,
    },
    timeType: {
        flex: 1,
    },
    categoryType: {
        flexDirection: 'row',
    },
    thisMonth: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        textAlign: 'center',
        fontSize: 16
    },
    lastMonth: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center',
        fontSize: 16
    },
    allTime: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        textAlign: 'center',
        fontSize: 16
    },
    viewTotal: {
        flexDirection: 'column',
        
    },
    group: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: screenWidth/20.55,
    },
    totalName: {
        fontSize: 16,
    },
    moneyGreen: {
        fontSize: 17,
        color: Colors.mediumseagreen
    },
    moneyRed: {
        fontSize: 17,
        color: Colors.orangered
    },
    moneyGray: {
        fontSize: 17,
        color: Colors.gray
    }

});
export default TotalScreenStyles;
