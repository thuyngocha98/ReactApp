import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 10
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft:20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    }
});

export default styles;
