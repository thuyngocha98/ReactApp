import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../../../constants/Dimensions";
import Colors from "../../../../../constants/Colors";

const ExpenseByPlusOrMinusStyles = StyleSheet.create({
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
        flex: 5,
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
        
    },
    contentLeft: {
        flex: 5.5,
        flexDirection: 'row',
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
    moneyOf: {
        fontSize: 17,
        fontWeight: '500'
    },
    totalMoney: {
        fontSize: 13
    },
    categoryList: {
        flex: 1,
        flexDirection: 'column',
    },
    flatlist1: {
    },
    viewTitle: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    txtTitle: {
        fontSize: 17,
        color: Colors.black
    },
    flatlist2: {
        flex:1,
    },
    flatlistMember: {
        flexDirection: 'column',
        marginHorizontal: screenWidth / 82.5
    },
    listMember: {
        flexDirection: 'row',
        marginRight: screenWidth / 41.1,
    },

    // flatlist 1
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
    avatar1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    name: {
        flex: 3.5,
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    txtVND: {
        color: Colors.gray,
        fontSize: 13,
    },
    viewInputMoney: {
        flex: 2.3,
        flexDirection: 'row',
    },
    viewVND: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewInput: {
        flexDirection: 'column',
        flex: 2.5,
    },
    input: {
        textAlign: 'right',
        fontSize: 19,
    },
    image: {
        width: screenWidth / 10,
        height: screenWidth / 10,
        borderRadius: screenWidth / 20,
    },
    txt: {
        fontSize: 17
    },
    underLine: {
        marginTop: screenWidth / 80,
        width: screenWidth - screenWidth / 10.275,
        height: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightgray
    },
    delete: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});
export default ExpenseByPlusOrMinusStyles;
