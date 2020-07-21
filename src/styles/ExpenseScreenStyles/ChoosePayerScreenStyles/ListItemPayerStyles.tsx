import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ListItemPayerStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: screenWidth/20.55,
        marginTop: screenWidth / 27.4,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    avatar: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    name: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    iconCheck: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    txt: {
        fontSize: 19
    },
    underLine: {
        marginTop: screenWidth / 27.4,
        width: screenWidth - screenWidth / 10.275,
        height: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightgray
    },
});
export default ListItemPayerStyles;
