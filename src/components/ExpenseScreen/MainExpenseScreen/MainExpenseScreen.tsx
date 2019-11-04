import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, SectionList, TouchableOpacity, StatusBar, Alert, FlatList } from 'react-native';
import MainExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/MainExpenseScreenStyles/MainExpenseScreenStyles';
import ListItemGroup from './ListItemGroup';

function mapStateToProps(state) {
    return {
        listAllTrip: state.listAllTrip.listAllTrip
    };
}

type Props = {
    navigation?: any,
    listAllTrip?: any
}

type States = {
    data?: any[],
}

class MainExpenseScreen extends Component<Props, States> {
    _navListener: any;
    state = {
        data: [
            this.props.listAllTrip
        ]
    }
    componentDidMount() {
        //set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            this.setState({
                data: this.props.listAllTrip
            })
        });
    }

    

    componentWillUnmount() {
        // remove barstyle
        this._navListener.remove();
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={MainExpenseScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={MainExpenseScreenStyles.header}>
                    <Text style={MainExpenseScreenStyles.headerTitle}>
                        Select a group
                    </Text>
                </View>
                <View style={MainExpenseScreenStyles.sectionHeader}>
                    <Text style={MainExpenseScreenStyles.title}>Group</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    extraData
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('InputExpenseScreen', { dataGroup: item })
                            }}
                        >
                            <ListItemGroup
                                nameGroup={item.name}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(MainExpenseScreen);