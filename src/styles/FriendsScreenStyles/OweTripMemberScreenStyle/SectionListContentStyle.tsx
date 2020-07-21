import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: screenWidth /41.14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
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
export default styles;
