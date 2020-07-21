import { StyleSheet, ColorPropType } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },
    description: {
        marginLeft: 15,
        alignItems: 'center',
        fontSize: 15,
        color: Colors.gray
    },
    money:{
        color: Colors.mediumseagreen
    }
});
export default Styles;
