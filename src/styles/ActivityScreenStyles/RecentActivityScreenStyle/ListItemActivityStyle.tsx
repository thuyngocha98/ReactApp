import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16
    },
    size: {
        fontSize: 16,
    },
    color: {
        color: Colors.mediumseagreen,
        fontSize: 16
    },
    time:{
        fontSize:14
    },
    container: {
        flexDirection: 'row',
        marginLeft:20
    },
    container1: {
        marginRight: 15
    },
    toast: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: -15,
        marginLeft: 25
    },
    hr: {
        flex:1,
        height:1,
        backgroundColor:Colors.lightgray,
        marginVertical:15
    }
});

export default styles;
