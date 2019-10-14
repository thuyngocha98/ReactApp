import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

    icons: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    details: {
        marginTop: 25,
        paddingHorizontal: 20
    },
    contentDetails: {
        flex: 7,
        marginLeft: 20,
        marginTop: -10
    },
    iconTravel: {
        fontSize: 20,
    },
    money: {
        fontWeight: 'bold',
        fontSize: 30
    },
    camera: {
        marginTop: -5,
        flex: 2,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#969696',
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 5,
    },
    personAdd: {
        flex:9,
        marginTop: 10,
        marginLeft: 20,
    },
    person: {
        flexDirection: 'row',
        marginBottom:10,
    },
    userBorder: {
        flexDirection:'row',
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
        borderRadius: 15,
        borderLeftWidth: 0,
        justifyContent:'center',
        alignItems:'center'
    },
    hr: {
        marginTop:15,
        borderColor: 'rgba(238,238,238,0.7)',
        borderWidth: 1,
    }
});
export default styles;
