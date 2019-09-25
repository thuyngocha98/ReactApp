import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemDetailStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/ListItemDetailStyles';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    text?: string
}

class ListItemDetail extends Component<Props> {
    render() {
        return (
            <View style={ListItemDetailStyles.container}>
                <Entypo name='level-down' size={20} color={Colors.lightgray} />
                <Text style={ListItemDetailStyles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemDetail);