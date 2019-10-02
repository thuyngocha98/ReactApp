import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";
import  Constants  from "expo-constants";

const DetailGroupScreenStyles = StyleSheet.create({
    headerRight: {
        marginRight: screenWidth /20.57,
        marginTop: screenWidth /41.14,
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    headerLeft: {
        marginLeft: screenWidth /27.43,
        marginTop: screenWidth /41.14,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        height: screenWidth/1.6456 + Constants.statusBarHeight
    },
    dateTitle: {
        backgroundColor: Colors.tintColor,
    },
    date: {
        margin: screenWidth /41.14,
    },
});
export default DetailGroupScreenStyles;
