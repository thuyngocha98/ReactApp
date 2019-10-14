import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../../../constants/Dimensions";
import Colors from "../../../../../constants/Colors";


const ExpenseMoreOptionScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    paidBy: {
        flexDirection: 'row',
        marginHorizontal: screenWidth/41.1,
    },
    imageAvatar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: screenWidth/41.1,
    },
    avatar: {
        width: screenWidth/8.935,
        height: screenWidth/8.935,
        borderRadius: screenWidth/17.87,
    },
    content: {
        flex: 4.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt1:{
        fontSize: 18
    },
    txt2: {
        fontSize: 18,
        fontWeight: '500'
    },
    iconRight: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    underLineInput: {
        width: screenWidth,
        height: 1,
        backgroundColor: Colors.lightgray
    },
    contentSplit: {
        flexDirection: 'column',
        marginVertical: screenWidth/13.7,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    title1: {
        fontSize: 17,
        fontWeight: "500"
    },
    title2: {
        fontSize: 16,
    },
    categorySelectTypeSplit: {
        flexDirection: 'row',
        marginHorizontal: screenWidth/41.1,
        marginVertical: screenWidth/41.1,
    },
    itemSelect: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.lightgray
    },
    txtSelect: {
        fontSize: 25,
        paddingHorizontal: screenWidth/27.4,
        paddingVertical: screenWidth/82.2,
        textAlign: 'center',
        marginHorizontal: screenWidth/82.2,
    },
    categoryTypeGroup: {
        flexDirection: 'row',
        margin: screenWidth/20.55
    },
    equal: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        borderTopLeftRadius: screenWidth / 82.2,
        borderBottomLeftRadius: screenWidth / 82.2,
        textAlign: 'center',
        fontSize: 25
    },
    number: {
        padding: screenWidth / 82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center',
        fontSize: 25
    },
    plusOrMinus: {
        padding: screenWidth / 82.2,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderTopRightRadius: screenWidth /82.25,
        borderBottomRightRadius: screenWidth / 82.2,
        textAlign: 'center',
        fontSize: 25
    },
    flatlist: {
        flex: 1,
    },
    viewTabBar: {
        borderColor: Colors.lightgray,
        elevation: 2,
        borderTopWidth: 0.5,
        backgroundColor: "#ffffff"
    },
    tabBar: {
        flexDirection: 'row',
        margin: screenWidth/27.4,
    },
    contentBar: {
        flex: 3.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyPerson: {
        fontSize: 17,
        fontWeight: '500'
    },
    numberPeople: {
        fontSize: 13
    },
    viewSeparate: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separate: {
        flex: 1,
        width: 1,
        marginVertical: screenWidth/82.2,
        backgroundColor: Colors.lightgray,
    },
    all: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtAll: {
        fontSize: 17,
        fontWeight: '500',
    },
    iconAll: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ExpenseMoreOptionScreenStyles;
