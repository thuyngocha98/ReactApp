import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ListItemGroupStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    sectionList: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: screenWidth/20.55,
        marginVertical: screenWidth/41.1,
    },
    iconHome: {
        width: screenWidth/10.275,
        height: screenWidth/10.275,
        tintColor: Colors.tintColor
    },
    textNameGroup: {

    },
    nameGroup: {
        fontSize: 20
    },
    underLine: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: Colors.lightgray
    }
});
export default ListItemGroupStyles;
