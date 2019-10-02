import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";
import Colors from "../../../../constants/Colors";
import { screenWidth } from "../../../../constants/Dimensions";

const BalanceScreenStyles = StyleSheet.create({
    headerLeft: {
        marginLeft: screenWidth /27.43,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    headerRight: {
        marginRight: screenWidth / 27.43,
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
});
export default BalanceScreenStyles;
