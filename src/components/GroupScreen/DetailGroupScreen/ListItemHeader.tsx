import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ListItemHeaderStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/ListItemHeaderStyles';
import Colors from '../../../constants/Colors';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    title?: string,
    itemSelected?: boolean,
}

class ListItemHeader extends Component<Props> {
    render() {
        return (
            <View style={[ListItemHeaderStyles.container, {backgroundColor: this.props.itemSelected ? Colors.tintColor : Colors.white}]}>
                <Text style={[ListItemHeaderStyles.text, { color: this.props.itemSelected ? Colors.white : Colors.blackText}]}>{this.props.title}</Text>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemHeader);