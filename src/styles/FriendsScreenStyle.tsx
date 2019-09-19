import {StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: 10
    },
    search: {
        flex: 1,
        opacity: 0.6
    },
    friends: {
        marginLeft: 20,
        marginTop: 10,
        fontWeight: '500',
        fontSize: 25,
    },
    addFriends: {
        fontSize: 20,
        marginRight: 10,
        opacity: 0.6
    },
    cartExpense: {
        height: 80,
        backgroundColor: Colors.tabIconSelected,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20
    },

});
export default styles;
