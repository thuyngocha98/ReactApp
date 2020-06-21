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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: screenWidth/4.11,
    },
    addTrip: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: screenWidth / 7.5,
        height: screenWidth / 7.5,
        borderRadius: screenWidth / 4,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: Colors.tintColor
    }
});
export default DetailGroupScreenStyles;
