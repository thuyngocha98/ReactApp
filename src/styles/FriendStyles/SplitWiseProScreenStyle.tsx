import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    close: {
        color: '#fff',
        fontSize: 18
    },
    splitWisePro: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    money: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    splitWise: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    details: {
        marginTop: 20,
    },
    pro: {
        fontSize: 20
    },
    free: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    payment: {
        backgroundColor: '#FE2901',
        paddingVertical: 10,
        paddingHorizontal: 70,
        justifyContent: 'center',
        borderRadius: 5,
    },
    or: {
        textAlign: 'center',
        fontSize:18,
        marginVertical: 10
    },
    save:{
        color: Colors.splitWise,
        marginTop:10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    notNow: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical:20,
        textDecorationLine:'underline',
        textDecorationStyle: "solid",
        textDecorationColor: "black"
    },
    term: {
        textDecorationLine:'underline',
        textDecorationStyle: "solid",
        textDecorationColor: "black",
        marginTop: 10
    }
});
export default styles;
