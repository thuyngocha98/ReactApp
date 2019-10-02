import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 25,
    },
   cancel: {
       color:'#fff'
   },
    addFriends: {
        fontSize:18,
        color:'#fff',
        textAlign: 'center',
        flex: 1,
        marginTop: -5
    },
    next: {
       color:'#fff'
    },
    input:{
        marginTop:10,
        flexDirection:'row',
        backgroundColor:'#fff',
        marginHorizontal:25,
        padding:7,
        borderRadius:5,
        marginBottom:15,
    }
});
export default styles;
