import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const MainExpenseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
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
});
export default MainExpenseScreenStyles;
