import {screenWidth, screenHeight} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

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
        width: screenWidth / 4,
        height: screenWidth / 4,
        borderRadius: screenWidth / 8,
        resizeMode: 'cover',
        marginTop: screenWidth / 13.7
    },
    male: {
        marginTop: screenWidth / 41.1
    },
    textUser: {
        marginTop: screenWidth / 100,
        fontSize: 16,
        color: Colors.white
    },
    email: {
        opacity: 0.7,
        marginBottom: screenWidth / 41.1,
        color: Colors.white
    },
    mainContainer: {
        marginTop: screenWidth / 15,
        paddingHorizontal: screenWidth / 20.55
    },
    overView: {
        marginVertical: screenWidth / 25,
        flexDirection: 'row'
    },
    textOverview: {
        marginLeft: screenWidth / 27.4,
        marginTop: 3,
        fontSize: 20,
        color: 'gray',
    },
    setting: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
    },
    textSetting: {
        marginLeft: screenWidth / 41.1,
        marginTop: 3,
        fontSize: 20,
        color: 'gray',
    },
    help: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        marginLeft: 4
    },
    textHelp: {
        marginLeft: screenWidth / 34.25,
        marginTop: 2,
        fontSize: 20,
        color: 'gray'
    },
    signOut: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        marginLeft: screenWidth/41.1
    },
    textSignOut: {
        marginLeft: screenWidth/34.25,
        marginTop: -2,
        fontSize: 20,
        color: 'gray',
    }

});

export default styles;
