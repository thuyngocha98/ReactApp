import React, {Component} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


class FriendsScreen extends Component {
    static  navigationOptions = {
      header: null
    };
    render() {
        return (
            <View>
                <Text style={styles.name}>
                    minh trung
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {

    }
});

export default FriendsScreen;
