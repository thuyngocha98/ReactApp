import { StyleSheet } from "react-native";
import { screenWidth } from "../../constants/Dimensions";
import Colors from "../../constants/Colors";

const SplashScreenStyles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    },
    indicator: {
        paddingTop: screenWidth / 7.2,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default SplashScreenStyles;