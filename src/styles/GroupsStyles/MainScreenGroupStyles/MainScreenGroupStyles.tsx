import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { screenWidth } from "../../../constants/Dimensions";

const MainScreenGroupStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    group: {
        marginLeft: screenWidth/20.55,
        marginTop: screenWidth/41.1,
        fontWeight: '500',
        fontSize: 25
    },
    cartExpense: {
        flexDirection: 'row',
        height: screenWidth/5.1375,
        backgroundColor: Colors.tintColor,
        marginHorizontal: screenWidth/20.55,
        marginTop: screenWidth/20.55,
        borderRadius: screenWidth/20.55,
        alignItems: 'center'
    },
    avatar: {
        width: screenWidth/6.85,
        height: screenWidth/6.85,
        resizeMode: 'cover',
        borderRadius: screenWidth/13.7,
        marginLeft: screenWidth/27.4
    },
    text: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: screenWidth/41.1,
    },
    textTotal: {
        color: Colors.white,
        fontSize: 17,
    },
    textDetail: {
        color: Colors.white,
        fontSize: 16,
        
    },
    menu: {
        flex: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    }
});
export default MainScreenGroupStyles;
