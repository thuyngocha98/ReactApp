import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
    scrollView: {
        marginTop: screenWidth/41.1
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: screenWidth/20.55,
        marginLeft: screenWidth / 20.55,
        opacity: 0.5
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    }
});

export default styles;
