import { StyleSheet, StatusBar } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth, APPBAR_HEIGHT } from "../../../constants/Dimensions";

const CreateGroupScreenStyles = StyleSheet.create({
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
    cancel: {
        fontSize: 17,
        color: Colors.white,
    },
    addContact: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
        flex: 1,
    },
    add: {
        fontSize: 17,
        color: Colors.white
    },
    categoryGroupName: {
        flexDirection: 'row',
        margin: screenWidth/20.55
    },
    iconCamera: {
        width: screenWidth/5.1375,
        height: screenWidth/5.1375
    },
    nameAndDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: screenWidth/27.4
    },
    groupName: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: screenWidth/82.2,
    },
    
    detail: {

    },
    categoryGroupType: {
        margin: screenWidth/20.55,
    },
    groupType: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: screenWidth/41.1,
    },
    categoryTypeGroup: {
        flexDirection: 'row',
    },
    apartment: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        textAlign: 'center'
    },
    house: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center'
    },
    trip: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center'
    },
    order: {
        padding: screenWidth/82.2,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        textAlign: 'center'
    }
});
export default CreateGroupScreenStyles;
