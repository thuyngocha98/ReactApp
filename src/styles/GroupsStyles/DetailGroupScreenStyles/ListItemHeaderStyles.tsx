import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const ListItemHeaderStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        margin: 10,
    },
    text: {
        paddingHorizontal: 15, 
        paddingVertical: 5,
        fontWeight: "500",
        fontSize: 16,
    }
});
export default ListItemHeaderStyles;
