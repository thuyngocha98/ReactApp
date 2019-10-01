import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const DetailGroupScreenStyles = StyleSheet.create({
    headerRight: {
        marginRight: 20,
        marginTop: 10,
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    headerLeft: {
        marginLeft: 15,
        marginTop: 10,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    dateTitle: {
        backgroundColor: Colors.tintColor,
    },
    date: {
        margin: 10,
    },
});
export default DetailGroupScreenStyles;
