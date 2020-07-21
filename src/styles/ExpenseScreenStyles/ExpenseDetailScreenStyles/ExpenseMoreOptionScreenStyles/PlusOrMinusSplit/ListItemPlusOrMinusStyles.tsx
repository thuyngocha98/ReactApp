import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../../../constants/Dimensions";
import Colors from "../../../../../constants/Colors";

const ListItemPlusOrMinusStyles = StyleSheet.create({
    flatlistMember: {
        flexDirection: 'column',
        marginHorizontal: screenWidth/82.5
    },
    listMember: {
        flexDirection: 'row',
        marginRight: screenWidth/41.1,
    },
    imageAvatar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: screenWidth/41.1,
    },
    avatar: {
        width: screenWidth/8.935,
        height: screenWidth/8.935,
        borderRadius: screenWidth/17.87,
    },
    content: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    txt2: {
        fontSize: 18,
        fontWeight: '500'
    },
    txtMoney: {
        fontSize: 13,
        color: Colors.gray
    },
    underLineInput: {
        width: screenWidth,
        height: 1,
        backgroundColor: Colors.lightgray
    },
    viewInputMoney: {
        flex: 1.7,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    viewUnitMoney: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    unitMoney: {
        color: Colors.gray,
        fontSize: 16,
    },
    viewInput: {
        flex: 1.7,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.gray,
    },
    inputMoney: {
        fontSize: 16,
        fontWeight: '500',
        height: screenWidth/13.7,
        textAlign: 'center'
    }
});
export default ListItemPlusOrMinusStyles;
