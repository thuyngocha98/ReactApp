import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const MainExpenseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header1: {
        margin: screenWidth/20.55,
    },
    headerTitle: {
        fontSize: 20,
        color: Colors.black
    },
    sectionHeader: {
        backgroundColor: Colors.lightgray
    },
    title: {
        marginHorizontal: screenWidth/20.55,
        marginVertical: screenWidth/41.1,
        fontSize: 17,
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
});
export default MainExpenseScreenStyles;
