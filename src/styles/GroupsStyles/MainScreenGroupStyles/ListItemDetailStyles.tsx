import { StyleSheet, ColorPropType } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ListItemDetailStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: screenWidth/20.55,
        alignItems: 'center',
    },
    text: {
        marginLeft: screenWidth/27.4,
        alignItems: 'center',
        fontSize: 15,
        color: Colors.gray
    }
});
export default ListItemDetailStyles;
