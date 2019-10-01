import { StyleSheet, ColorPropType } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
        marginBottom:5
    },
    owe: {
        marginLeft: 5,
    },
    owes:{
      marginRight:5
    },
    oweContainer:{
        flexDirection: 'row',
        marginLeft:20,
    },
    image:{
        width:20,
        height:20,
        borderRadius:10,
        resizeMode:'cover',
        marginRight:10,
    }
});
export default Styles;
