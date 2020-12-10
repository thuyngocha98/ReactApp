import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
import { screenHeight, screenWidth } from "../../../../constants/Dimensions";

const ListItemBalanceStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: screenWidth/41.1,
        marginBottom: screenWidth/41.1,
        paddingTop: screenHeight/56,
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
        width: screenWidth/8,
        height: screenWidth/8,
        borderRadius: screenWidth/16,
        borderWidth: 1,
        borderColor: Colors.lavender,
    },
    title: {
        flex: 3.5,
        flexDirection: 'column',
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
        marginTop: screenHeight/56,
    },
    secondItem: {
        flexDirection: 'row',
        width: screenWidth,
        marginLeft: screenWidth/4.835,
        alignItems: 'center',
    },
    iconSecond: {

    },
    avatarSecond: {
        margin: screenWidth/82.2
    },
    photoSecond: {
        width: screenWidth/17.125,
        height: screenWidth/17.125,
        borderRadius: screenWidth/34.25
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
        borderRadius: screenWidth/82.2,
        elevation: 3,
        marginHorizontal: screenWidth/82.2,
        // borderBottomWidth: 2,
        // borderColor: Colors.lightgray
        
    },
    txt: {
        color: Colors.blackText,
        paddingHorizontal: screenWidth/27.4,
        padding: 5,
        fontSize: 15,
        fontWeight: '500'
    },
    lineBottom: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: Colors.lightgray,
        marginTop: screenWidth/41.1,
    }

});
export default ListItemBalanceStyles;
