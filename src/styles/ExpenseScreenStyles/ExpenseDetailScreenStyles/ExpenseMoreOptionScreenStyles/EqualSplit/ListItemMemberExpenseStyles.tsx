import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../../../constants/Dimensions";
import Colors from "../../../../../constants/Colors";

const ListitemMemberExpenseStyles = StyleSheet.create({
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt2: {
        fontSize: 18,
        fontWeight: '500'
    },
    iconRight: {
        flex: 1.7,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    underLineInput: {
        width: screenWidth,
        height: 1,
        backgroundColor: Colors.lightgray
    },
    flatlistMember: {
        flexDirection: 'column',
        marginHorizontal: screenWidth/82.5
    },
    listMember: {
        flexDirection: 'row',
        marginRight: screenWidth/41.1,
    },
});
export default ListitemMemberExpenseStyles;
