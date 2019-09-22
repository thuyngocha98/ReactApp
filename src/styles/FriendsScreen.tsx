import {StyleSheet} from "react-native";

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
        marginTop: 20,
        fontWeight: '500',
        fontSize: 25
    },
    addFriends: {
        fontSize: 20,
        marginRight: 10,
        opacity: 0.6
    },
    cartExpense: {
        height: 80,
        backgroundColor: 'mediumseagreen',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20
    },

});
export default styles;
