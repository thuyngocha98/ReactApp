import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const ListItemHeaderStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        margin: screenWidth /41.14,
    },
    text: {
        paddingHorizontal: screenWidth /27.43, 
        paddingVertical: screenWidth/82.28,
        fontWeight: "500",
        fontSize: 16,
    }
});
export default ListItemHeaderStyles;
