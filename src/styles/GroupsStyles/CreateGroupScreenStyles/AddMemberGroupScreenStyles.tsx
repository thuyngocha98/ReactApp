import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    cancel: {
        fontSize: 17,
        color: Colors.white
    },
    addFriends: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
        flex: 1,
    },
    next: {
        fontSize: 17,
        color: Colors.white
    },
    input: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginHorizontal: 15,
        padding: 7,
        borderRadius: 5,
        marginBottom: 15,
    },
    iconAdd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewContent: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
    },
    viewEmail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.lightgray,
        borderBottomWidth: 0.5,
    },
    textEmail: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '400',
    }
});
export default styles;
