import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../../../../constants/Colors";
import { APPBAR_HEIGHT, screenHeight, screenWidth } from "../../../../constants/Dimensions";

const BalanceScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + Constants.statusBarHeight,
        backgroundColor: Colors.tabIconSelected,
    },
    header: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addContact: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        paddingLeft: screenWidth/27,
        paddingRight: screenWidth/24,
        paddingVertical: screenWidth/72,
    },
    save: {
        paddingRight: screenWidth/27,
        paddingLeft: screenWidth/27,
        paddingVertical: screenWidth/72,
    },

});
export default BalanceScreenStyles;
