import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";
import  Constants  from "expo-constants";

const styles = StyleSheet.create({

    header: {
        height: screenWidth/1.6456 + Constants.statusBarHeight
    },
    marginTop: {
        marginTop:  screenWidth/1.6456 + Constants.statusBarHeight
    },
    dateTitle: {
        backgroundColor: Colors.tintColor,
    },
    date: {
        margin: screenWidth /41.14,
    },
});
export default styles;
