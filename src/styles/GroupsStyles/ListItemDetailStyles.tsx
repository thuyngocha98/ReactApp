import { StyleSheet, ColorPropType } from "react-native";
import { screenWidth } from "../../constants/Dimensions";
import Colors from "../../constants/Colors";

const ListItemDetailStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },
    text: {
        marginLeft: 15,
        alignItems: 'center',
        fontSize: 15,
        color: Colors.gray
    }
});
export default ListItemDetailStyles;
