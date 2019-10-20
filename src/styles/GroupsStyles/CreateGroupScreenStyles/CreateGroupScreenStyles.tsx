import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const CreateGroupScreenStyles = StyleSheet.create({
    headerRight: {
        marginRight: screenWidth/27.4
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    headerLeft: {
        marginLeft: screenWidth/27.4,
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    container: {
        flex: 1,
        flexDirection: 'column'
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
