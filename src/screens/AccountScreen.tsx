import React, {Component} from 'react';
import {StatusBar, View} from "react-native";
import MainAccountScreen from "../components/AccountScreen/MainAccountScreen";

type Props = {
    navigation?: any
}

class AccountScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        const {navigation} = this.props;
        return (
            <View>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent/>
                <MainAccountScreen
                navigation={navigation}
                />
            </View>
        );
    }
}

export default AccountScreen;



