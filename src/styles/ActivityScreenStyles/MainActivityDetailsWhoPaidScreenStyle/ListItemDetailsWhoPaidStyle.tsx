import { StyleSheet } from "react-native";
import { screenWidth } from "../../../constants/Dimensions";

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texts: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
    },
    namePaid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,

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
        borderRadius:40,
        resizeMode: 'cover',
    },
    personPaid: {
        fontWeight: '400',
        fontSize: 16
    }
});
export default Styles;
