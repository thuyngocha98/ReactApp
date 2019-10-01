import React, {Component} from 'react';
import { connect } from 'react-redux';
import Styles from "../../../styles/FriendsScreenStyles/MainFriendsOweScreenStyle/ListDetailFriendsOweStyle";
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';

type Props = {
    description?: string,
    money?:any,
    type?:string
}

class ListDetailFriendsOwe extends Component<Props> {
    render() {
        return (
            <View style={Styles.container}>
                <Entypo name='level-down' size={20} color={Colors.lightgray} />
                <Text style={Styles.description}>{this.props.description}</Text>
                <Text style={Styles.money}>{this.props.money}</Text>
                <Text >{this.props.type}</Text>
            </View>
        );
    }
}

export default ListDetailFriendsOwe;
