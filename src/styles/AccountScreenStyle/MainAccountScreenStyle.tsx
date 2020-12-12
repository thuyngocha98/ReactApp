import { screenWidth, screenHeight } from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.tabIconSelected,
    },
    header: {
        marginTop: screenHeight / 20,
        alignItems: 'center'
    },
    textAccount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.white
    },
    avatar: {
        width: screenWidth / 3.4,
        height: screenWidth / 3.4,
        borderRadius: screenWidth / 6.8,
        resizeMode: 'cover',
        marginTop: screenWidth / 54.8
    },
    male: {
        marginTop: screenWidth / 41.1
    },
    textUser: {
        marginTop: screenWidth / 100,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white
    },
    email: {
        opacity: 0.8,
        fontSize: 17,
        marginBottom: screenWidth / 27.4,
        color: Colors.white
    },
    mainContainer: {
        marginTop: screenWidth / 36,
        paddingHorizontal: screenWidth / 36,
        backgroundColor: Colors.white
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewIcon: {
        width: screenWidth/10,
        height: screenWidth/10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtItem: {
        fontSize: 17,
        color: Colors.blackText,
        flex: 1,
        marginLeft: screenWidth/36,
    },
    viewTxt: {
        flex: 1,
        borderBottomWidth:1,
        borderBottomColor: Colors.lavender,
        
    },
    viewRow: {
        paddingVertical: screenHeight/56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    overView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: screenHeight/56,
    },
    txtTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.tintColor,
    },
    txtDesc: {
        fontSize: 15,
        color: Colors.gray,
        marginTop: screenHeight/108,
        marginHorizontal: screenWidth/36,
        textAlign: 'center'
    }

});

export default styles;