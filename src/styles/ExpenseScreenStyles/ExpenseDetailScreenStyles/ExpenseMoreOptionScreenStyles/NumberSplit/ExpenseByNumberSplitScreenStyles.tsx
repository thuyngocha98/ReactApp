import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../../../constants/Dimensions";
import Colors from "../../../../../constants/Colors";

const ExpenseByNumberSplitScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + StatusBar.currentHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: screenWidth / 27.43,
    },
    addContact: {
        flex: 7,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        flex: 1,
    },
    add: {

        fontSize: 17,
        color: Colors.white
    },
    save: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        marginVertical: screenWidth/82.2,
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
        margin: screenWidth / 20.55
    },
    equal: {
        padding: screenWidth / 82.2,
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
        borderTopRightRadius: screenWidth / 82.2,
        borderBottomRightRadius: screenWidth/82.2,
        textAlign: 'center',
        fontSize: 25
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
    moneyOf: {
        fontSize: 17,
        fontWeight: '500'
    },
    totalMoney: {
        fontSize: 13
    },

    flatlistMember: {
        flexDirection: 'column',
        marginHorizontal: screenWidth / 82.5
    },
    listMember: {
        flexDirection: 'row',
        marginRight: screenWidth / 41.1,
    },
    viewUnitMoney: {
        flex: 1.2,
    },
    unitMoney: {
        color: Colors.gray,
        fontSize: 15,
    },
    inputMoney: {
        fontSize: 16,
        fontWeight: '500',
        height: screenWidth / 13.7,
    },

    flatlist: {
        flex: 1,
    },
    mainFlatlist: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: screenWidth / 20.55,
        marginTop: screenWidth / 27.4,
    },
    containerFlatlist: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    avatar: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    name: {
        flex: 4,
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    txtVND: {
        color: Colors.gray,
        fontSize: 15,
    },
    viewInputMoney: {
        flex: 2,
        flexDirection: 'row',
    },
    viewVND: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewInput: {
        flexDirection: 'column',
        flex: 2,
    },
    input: {
        textAlign: 'right',
        fontSize: 20,
    },
    image: {
        width: screenWidth / 8.22,
        height: screenWidth / 8.22,
        borderRadius: screenWidth / 16.44,
    },
    txt: {
        fontSize: 19
    },
    underLine: {
        marginTop: screenWidth / 27.4,
        width: screenWidth - screenWidth / 10.275,
        height: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightgray
    },

    // footer
    footer: {
        width: screenWidth,
        height: screenWidth / 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: Colors.gray,
    },
    line1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyTotal: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '400',
    },
    line2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyLeft: {
        fontSize: 17,
    }
});
export default ExpenseByNumberSplitScreenStyles;
