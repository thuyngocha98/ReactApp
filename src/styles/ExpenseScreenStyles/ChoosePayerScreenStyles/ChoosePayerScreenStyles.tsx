import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ChoosePayerScreenStyles = StyleSheet.create({
    textHeaderLeft: {
        fontSize: 16,
        color: Colors.white
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
        flex: 2,
    },
    add: {
        fontSize: 16,
        color: Colors.white
    },
    save: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    flatlist: {

    },
    multiplePeople: {
        flexDirection: 'row'
    },
    title: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
     underLine: {
        marginTop: screenWidth / 21.5,
        width: screenWidth - screenWidth/10.275,
        height: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightgray
    },
    txt: {
        fontSize: 19
    },
    multiple: {
        marginTop: screenWidth/20.55,
        marginHorizontal: screenWidth/20.55,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default ChoosePayerScreenStyles;
