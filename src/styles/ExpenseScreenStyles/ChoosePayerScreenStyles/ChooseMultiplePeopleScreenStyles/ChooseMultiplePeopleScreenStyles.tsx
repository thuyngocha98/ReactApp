import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../../constants/Dimensions";
import Colors from "../../../../constants/Colors";

const ChooseMultiplePeopleScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
    },
    cancel: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    textCancel: {
        marginLeft: 5,
        color: Colors.white,
        fontSize: 18,
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

    // flatlist
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
        flexDirection: 'column',
        justifyContent: 'center',
    },
    txtVND: {
        color: Colors.gray,
        fontSize: 17,
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
        width: 50,
        height: 50,
        borderRadius: 25,
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
        height: 100,
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
export default ChooseMultiplePeopleScreenStyles;
