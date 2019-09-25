import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const DetailGroupScreenStyles = StyleSheet.create({
    headerRight: {
        marginRight: 15
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    headerLeft: {
        marginLeft: 15,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
});
export default DetailGroupScreenStyles;
