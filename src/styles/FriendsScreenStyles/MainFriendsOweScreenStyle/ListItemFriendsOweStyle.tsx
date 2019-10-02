import { StyleSheet } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texts: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
    },
    nameFriend: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        justifyContent: 'center'
    },
    textDetail: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'flex-end',
        marginRight: 5
    },
    avatar: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    name: {
        fontWeight: '400',
        fontSize: 16
    }
});
export default Styles;
