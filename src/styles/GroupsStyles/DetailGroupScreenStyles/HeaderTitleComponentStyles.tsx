import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const HeaderTitleComponentStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: screenWidth,
        height: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCamera: {
        width: 80,
        height: 80,
        tintColor: Colors.white,
        margin: 10
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: Colors.white   
    },
    numberPeopleAndTime: {
        marginBottom: 10,
        fontSize: 14,
        color: Colors.white   
    },
    owesAndMoney: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    owes: {
        fontSize: 17,
        color: Colors.white   
    },
    money: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.white   
    },
    flatList: {
        backgroundColor: '#696969',
        height: 55,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default HeaderTitleComponentStyles;
