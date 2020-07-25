import { StyleSheet, StatusBar } from "react-native";
import Constants from "expo-constants";
import { screenWidth, APPBAR_HEIGHT, screenHeight } from "../../../constants/Dimensions";
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
    },
    viewSetAgain: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    btnSetAgain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: screenWidth/24,
        paddingHorizontal: screenWidth/72,
        paddingVertical: screenWidth/144,
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        elevation: 3,
        borderRadius: screenWidth / 72
    },
    txtSetAgain: {
        fontSize: 10,
        marginRight: screenWidth/72,
    },
    sectionDescription: {
        flexDirection: 'row',
    },
    iconDescription: {
        borderColor: Colors.lightgray,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: screenWidth/82.2
    },
    inputDescription: {
        flexDirection: 'column',
        margin: screenWidth/82.2,
        justifyContent: 'flex-end'
    },
    inputLocation: {
        paddingVertical: 0,
    },
    txtInputDescription: {
        width: screenWidth*0.5,
        fontSize: 17,
        marginBottom: screenWidth/82.2
    },
    underLineInput: {
        width: screenWidth*0.5,
        height: 1.5,
        backgroundColor: Colors.blackText
    },
    underLineInput1: {
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
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: screenWidth/35,
        paddingVertical: screenWidth/90,
        color: Colors.gray
    },
    inputMoney: {
        flexDirection: 'column',
        margin: screenWidth/82.2,
        justifyContent: 'flex-end'
    },
    txtInputMoney: {
        fontSize: 20,
        marginBottom: screenWidth/82.2
    },
    btnSubmit: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenWidth/20.55,
        marginBottom: screenWidth/24
    },
    text1: {
        fontSize: 15,
        fontWeight: '400',
    },
    text2: {
        fontSize: 15,
        fontWeight: '300',
        padding: screenWidth/82.2,
    },
    button: {
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        elevation: 3,
        borderRadius: screenWidth / 82.2
    },
    viewRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: screenWidth/24,
        paddingVertical: screenWidth/ 24,
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: Colors.lightgray,
        height: 1,
        marginHorizontal: screenWidth/24,
    },
    viewIconAndTitleItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtTitleItem: {
        fontSize: 15,
        marginLeft: screenWidth/36,
    },
    viewIconRightItem: {
        transform: [
            {rotate: '90deg'}
        ]
    },
    // =========== location ========
    viewMainAddLocation: {
        flexDirection: 'column',
    },
    viewAddLocation: {
        width: '100%',
        height: screenHeight/1.97,
    },
    mapStyle: {
        margin: screenWidth/24,
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    viewGetCurrentLocation: {
        width: screenWidth/12,
        height: screenWidth/12,
        borderRadius: screenWidth/24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        marginRight: screenWidth/18,
        marginBottom: screenWidth/18,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.white,
    },
    viewHeaderAddLocation: {
        flexDirection: 'column',
        marginHorizontal: screenWidth/24,
    },
    viewEnableLocation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewNoneEnableSwitch: {
        width: screenWidth/13.85,
        height: screenWidth/20,
        borderRadius: screenWidth/40,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: screenWidth/180,
    },
    viewEnableSwitch: {
        width: screenWidth/13.85,
        height: screenWidth/20,
        borderRadius: screenWidth/40,
        backgroundColor: Colors.tintColor,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: screenWidth/180,
    },
    viewCircleSwitch: {
        width: screenWidth/25.7,
        height: screenWidth/25.7,
        borderRadius: screenWidth/51.43,
        backgroundColor: Colors.white,
    },
    viewInputTitleLocation: {

    }
});
export default InputExpenseScreenStyles;
