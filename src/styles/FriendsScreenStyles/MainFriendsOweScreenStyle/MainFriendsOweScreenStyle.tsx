import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

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
        flexDirection:'row',
        height: 80,
        backgroundColor: Colors.tabIconSelected,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        alignItems:'center'
    },
    avatar: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginLeft: 15,
        marginRight:10
    },
    textDetail: {
        color: 'white'
    },
    iconMenu: {
        marginRight:10,
        opacity:0.8
    }
});
export default styles;
