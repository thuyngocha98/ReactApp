import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import ListItemGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/ListItemGroupStyles';
import Colors from '../../../constants/Colors';
import { FontAwesome5, Entypo, Octicons } from '@expo/vector-icons';
import ListItemDetail from './ListItemDetail';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    nameGroup?: string,
    detail?: string,
    price?: string,
    data?: any[]
}

class ListItemGroup extends Component<Props> {
    render() {
        return (
            <View style={ListItemGroupStyles.mainContainer}>
                <View style={ListItemGroupStyles.container1}>
                    <Image
                        style={ListItemGroupStyles.avatar}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png' }}
                    />
                    <View style={ListItemGroupStyles.texts}>
                        <View style={ListItemGroupStyles.nameGroup}>
                            <Text style={ListItemGroupStyles.name}>{this.props.nameGroup}</Text>
                        </View>
                        <View style={ListItemGroupStyles.textDetail}>
                            <Text>{this.props.detail}</Text>
                            <Text>{this.props.price}</Text>
                        </View>
                    </View>
                    <Octicons name='chevron-right' size={25} color={Colors.lightgray} />
                </View>
                <View>
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => (
                            <ListItemDetail
                                text={item.text}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(ListItemGroup);