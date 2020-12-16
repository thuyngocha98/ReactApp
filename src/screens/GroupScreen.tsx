import React, {Component} from 'react';
import {View } from 'react-native';
import MainScreenGroup from '../components/GroupScreen/MainScreenGroup/MainScreenGroup';

type Props = {
    navigation?: any,
}


class GroupScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <MainScreenGroup
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

export default GroupScreen;
