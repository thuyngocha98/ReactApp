import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
import { screenWidth } from "../../../../constants/Dimensions";

const ListItemBalanceStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        
    },
    firtItem: {
        flexDirection: 'row',
    },
    touchStyle: {
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photo: {
        width: 46,
        height: 46,
        borderRadius: 23
    },
    title: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center'

    },
    name: {
        fontWeight: '600',
        fontSize: 16,
    },
    money: {
        fontSize: 16
    },
    normal: {
        fontSize: 15,
        fontWeight: '300',
        color: Colors.black
    },
    icon: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: "center"

    },
    containerSecond: {
        flexDirection: 'column',
    },
    secondItem: {
        flexDirection: 'row',
        width: screenWidth,
        marginLeft: 85,
        alignItems: 'center',
    },
    iconSecond: {

    },
    avatarSecond: {
        margin: 5
    },
    photoSecond: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    text: {

    },
    nameSecond: {
        color: Colors.gray,
        fontSize: 12
    },
    normalSecond: {
        color: Colors.gray,
        fontSize: 12
    },
    moneySecond: {
        color: Colors.mediumseagreen,
        fontSize: 13
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        borderRadius: 5,
        elevation: 1,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        borderColor: Colors.lightgray
        
    },
    txt: {
        color: Colors.blackText,
        paddingHorizontal: 15,
        padding: 5,
        fontSize: 15,
        fontWeight: '500'
    },
    lineBottom: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: Colors.lightgray,
        marginTop: 10,
    }

});
export default ListItemBalanceStyles;
