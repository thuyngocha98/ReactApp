import { StyleSheet } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ListItemGroupStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: screenWidth/20.55,
        marginTop: screenWidth/41.1,
        paddingBottom: screenWidth/41.1,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightgray
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texts: {
        flex: 1,
        flexDirection: 'row',
        margin: screenWidth/82.2,
    },
    nameGroup: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: screenWidth/41.1,
        justifyContent: 'center'
    },
    textDetail: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'flex-end',
        marginRight: screenWidth/82.2
    },
    avatar: {
        width: screenWidth / 10.275,
        height: screenWidth / 10.275,
        resizeMode: 'contain',
    },
    name: {
        fontWeight: '400',
        fontSize: 16
    }
});
export default ListItemGroupStyles;
