import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const MainScreenGroupStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    group: {
        marginLeft: 20,
        marginTop: 15,
        fontWeight: '500',
        fontSize: 25
    },
    cartExpense: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: Colors.tintColor,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginLeft: 15
    },
    text: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textTotal: {

    },
    textDetail: {
        color: Colors.mediumseagreen
    },
    menu: {
        flex: 1
    },
});
export default MainScreenGroupStyles;
