import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const InputExpenseScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + StatusBar.currentHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: screenWidth / 27.43,
    },
    addContact: {
        flex: 7,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        flex: 1,
    },
    add: {
       
        fontSize: 17,
        color: Colors.white
    },
    save: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    header1: {
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
        fontSize: 16
    },
    underLine: {
        width: screenWidth,
        height: 0.5,
        backgroundColor: Colors.lightgray
    },
    sectionInput: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: screenWidth/13.7,
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
        width: screenWidth*0.5,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lightgray,
        elevation: 2,
        borderRadius: screenWidth/82.2
    },
    iconvnd: {
        fontSize: 30,
        fontWeight: '600',
        paddingHorizontal: screenWidth/27.4,
        paddingVertical: screenWidth/82.2,
        color: Colors.gray
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenWidth/20.55,
    },
    text1: {
        fontSize: 17,
        fontWeight: '400',
    },
    text2: {
        fontSize: 17,
        fontWeight: '300',
        padding: screenWidth/82.2,
    },
    button: {
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        elevation: 3,
        borderRadius: screenWidth / 82.2
    }
});
export default InputExpenseScreenStyles;
