import React, {Component} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import MainScreenGroup from '../components/GroupScreen/MainScreenGroup/MainScreenGroup';
import { EvilIcons } from '@expo/vector-icons';

type Props = {
    navigation?: any,
}

class GroupScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
            },
            headerRight:
                (
                    <View style={{ marginRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('CreateGroupScreen')
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>Start a new group</Text>
                        </TouchableOpacity>
                    </View>
                ),
            headerLeft:
                (
                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity >
                            <EvilIcons name='search' size={30} />
                        </TouchableOpacity>
                    </View >
                )
        };
    };

    render() {
        return (
            <MainScreenGroup  
                    navigation={this.props.navigation}
            />
        );
    }
}

export default GroupScreen;
