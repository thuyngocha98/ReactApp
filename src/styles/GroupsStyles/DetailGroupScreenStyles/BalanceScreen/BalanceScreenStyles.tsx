import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../../../../constants/Colors";
import { screenWidth } from "../../../../constants/Dimensions";

const BalanceScreenStyles = StyleSheet.create({
    headerLeft: {
        marginLeft: screenWidth / 27.43,
    },
    textHeaderLeft: {
        fontSize: 16,
        color: Colors.white
    },
    headerRight: {
        marginRight: screenWidth / 27.43,
    },
    textHeaderRight: {
        fontSize: 16,
        color: Colors.white
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10
    },

});
export default BalanceScreenStyles;
