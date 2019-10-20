import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const InputExpenseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flexDirection: "row",
        alignItems: 'center'
    },
    txt1: {
        marginLeft: screenWidth/20.55,
        fontSize: 17
    },
    txt2: {
        fontWeight: "500",
        fontSize: 17
    },
    nameGroup:{
        flexDirection: 'row',
        borderRadius: screenWidth/20.55,
        borderWidth: 1,
        borderColor: Colors.lightgray,
        alignItems: 'center',
        margin: screenWidth/27.4
    },
    image: {
        width: screenWidth/10.275,
        height: screenWidth/10.275,
        tintColor: Colors.tintColor,
        borderColor: Colors.lightgray,
    },
    txtAllOf: {
        paddingHorizontal: screenWidth/41.1,
        fontSize: 17
    },
    underLine: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: Colors.lightgray
    },
    sectionInput: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionDescription: {
        flexDirection: 'row',
    },
    iconDescription: {
        borderColor: Colors.lightgray,
        elevation: 2,
        borderRadius: screenWidth/82.2
    },
    inputDescription: {
        flexDirection: 'column',
        margin: screenWidth/82.2,
        justifyContent: 'flex-end'
    },
    txtInputDescription: {
        fontSize: 21,
        marginBottom: screenWidth/82.2
    },
    underLineInput: {
        width: screenWidth*0.5,
        height: 1.5,
        backgroundColor: Colors.blackText
    },
    sectionMoney: {
        flexDirection: 'row',
        marginTop: screenWidth/27.4,

    },
    iconMoney: {
        borderColor: Colors.lightgray,
        elevation: 2,
        borderRadius: screenWidth/82.2
    },
    inputMoney: {
        flexDirection: 'column',
        margin: screenWidth/82.2,
        justifyContent: 'flex-end'
    },
    txtInputMoney: {
        fontSize: 23,
        fontWeight: "500",
        marginBottom: screenWidth/82.2
    },
    btnSubmit: {

    },
    txtSubmit: {
        borderColor: Colors.lightgray,
        marginTop: screenWidth/20.55,
        borderRadius: screenWidth/82.2,
        elevation: 2,
        borderBottomWidth: 1.5,
        padding: screenWidth/41.1,
        fontSize: 17,
    }
});
export default InputExpenseScreenStyles;
