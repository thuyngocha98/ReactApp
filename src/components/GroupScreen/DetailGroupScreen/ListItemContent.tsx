import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ListItemContentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/ListItemContentStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    month?: string,
    day?: string,
    title?: string,
    detail?: string,
    titleMoney?: string,
    money?: string,
}

class ListItemContent extends Component<Props> {
    render() {
        return (
            <View style={ListItemContentStyles.container}>
                <View style={ListItemContentStyles.time}>
                    <Text style={ListItemContentStyles.month}>{this.props.month}</Text>
                    <Text style={ListItemContentStyles.day}>{this.props.day}</Text>
                </View>
                <View style={ListItemContentStyles.iconTitle}>
                    <FontAwesome5 name='city' size={20} color={Colors.lightgray} />
                </View>
                <View style={ListItemContentStyles.content}>
                    <Text style={ListItemContentStyles.title}>{this.props.title}</Text>
                    <Text style={ListItemContentStyles.detail} numberOfLines={1}>{this.props.detail}</Text>
                </View>
                <View style={ListItemContentStyles.totalMoney}>
                    <Text style={ListItemContentStyles.titleMoney}>{this.props.titleMoney}</Text>
                    <Text style={ListItemContentStyles.money}>{this.props.money}</Text>
                </View>
                <View style={ListItemContentStyles.iconDetail}>
                    <FontAwesome5 name='chevron-right' size={20} color={Colors.lightgray} />
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemContent);
