import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const ListItemContentStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'center',
    },
    month: {

    },
    day: {

    },
    iconTitle: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 17,
        fontWeight: '400'
    },
    detail: {
        fontSize: 13,
        color: Colors.gray
    },
    totalMoney: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    titleMoney: {
        color: Colors.mediumseagreen
    },
    money: {
        color: Colors.mediumseagreen,
        fontSize: 16,
        fontWeight: "400"
    },
    iconDetail: {
        flex: 0.5,
        alignItems: 'center'
    }
});
export default ListItemContentStyles;
