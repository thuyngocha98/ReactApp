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
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginHorizontal: 15,
        padding: 7,
        borderRadius: 5,
        marginBottom: 15,
    },
    input1: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginHorizontal: 15,
        padding: 7,
        borderRadius: 5,
        marginBottom: 15,
    },
    iconSearch: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    nameAndMail: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    textEmail: {
        fontSize: 15.5,
        color: Colors.tintColor
    },
    textName: {
        fontSize: 17,
        fontWeight: '400',
        color: Colors.blackText
    }
});
export default styles;
