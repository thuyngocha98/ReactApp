import {StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            paddingTop: 40,
            paddingHorizontal: 25,
            marginBottom: 15
        },
        cancel: {
            color:'#fff'
        },
    addContact: {
        fontSize:18,
        color:'#fff',
        textAlign: 'center',
        flex: 1,
        marginTop: -5
    },
    add: {
        color:'#fff'
    },
    input: {
        marginVertical: 10,
        borderBottomWidth:1,
        opacity:0.5
    },
    inputFocused: {
        marginVertical: 10,
        borderBottomWidth:1,
        borderBottomColor: Colors.tabIconSelected
    },
    modalWindow: {
        margin:0
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default styles;
