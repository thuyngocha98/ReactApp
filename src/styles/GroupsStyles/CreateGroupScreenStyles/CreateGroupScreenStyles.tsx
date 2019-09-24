import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const CreateGroupScreenStyles = StyleSheet.create({
    headerRight: {
        marginRight: 15
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    headerLeft: {
        marginLeft: 15,
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
        margin: 20
    },
    iconCamera: {
        width: 80,
        height: 80
    },
    nameAndDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 15
    },
    groupName: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 5,
    },
    
    detail: {

    },
    categoryGroupType: {
        margin: 20,
    },
    groupType: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 10,
    },
    categoryTypeGroup: {
        flexDirection: 'row',
    },
    apartment: {
        padding: 5,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        textAlign: 'center'
    },
    house: {
        padding: 5,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center'
    },
    trip: {
        padding: 5,
        borderWidth: 1,
        borderRightWidth: -1,
        borderColor: Colors.tintColor,
        textAlign: 'center'
    },
    order: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        textAlign: 'center'
    }
});
export default CreateGroupScreenStyles;
