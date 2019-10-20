import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { screenWidth } from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

const ExpenseDetailScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.lightgray
    },
    txtHeader: {
        padding: screenWidth/24.765,
        fontSize: 18
    },
    listItem: {
        flexDirection: 'column',
    },
    listItemDetail: {
        flexDirection: 'row',
        margin: screenWidth/20.55,
    },
    avatar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
        
    },
    avatar1: {
        width: screenWidth/10.275,
        height: screenWidth/10.275,
        borderRadius: screenWidth/20.55,
        zIndex: 2
       
    },
    avatar2: {
        width: screenWidth/12.088,
        height: screenWidth/12.088,
        borderRadius: screenWidth/24.175,
        zIndex:1,
        marginLeft: -screenWidth/82.2
    },
    avatar3: {
        width: screenWidth / 12.088,
        height: screenWidth / 12.088,
        borderRadius: screenWidth / 24.175,
        zIndex: 1
    },
    avatar4: {   
        width: screenWidth / 10.275,
        height: screenWidth/10.275,
        borderRadius: screenWidth/20.55,
        zIndex: 2,
        marginLeft: -screenWidth/82.2
    },
    content: {
        flex: 3,
        flexDirection: 'column',
    },
    txt1: {
        fontSize: 16
    },
    txt2: {
        fontSize: 16,
        color: Colors.mediumseagreen
    },
    txt3: {
        fontSize: 16,
        color: Colors.orangered
    },
    iconCheck: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    underLineInput: {
        width: screenWidth,
        height: 1,
        backgroundColor: Colors.lightgray
    },
    btnMoreOption: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    txtMoreOption: {
        borderColor: Colors.lightgray,
        marginTop: screenWidth/20.55,
        borderRadius: screenWidth/82.2,
        elevation: 2,
        padding: screenWidth/41.1,
        fontSize: 17,
    }
});
export default ExpenseDetailScreenStyles;
