import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, SectionList, TouchableOpacity, StatusBar, Alert } from 'react-native';
import MainExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/MainExpenseScreenStyles/MainExpenseScreenStyles';
import Colors from '../../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import ListItemGroup from './ListItemGroup';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class MainExpenseScreen extends Component<Props> {
    _navListener: any;

    componentDidMount() {
         // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
        });
    }

    componentWillUnmount() {
        // remove barstyle
        this._navListener.remove();
    }

    data = [
        {
            title: "Groups",
            data: [
                {
                    nameGroup: "Hotel"
                    
                },
                {
                    nameGroup: "Vũng tàu"
                    
                },
                {
                    nameGroup: "Nha Trang"
                    
                },
            ]
        },
    ];
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
                <SectionList
                    sections={this.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('InputExpenseScreen', {nameGroup: item.nameGroup})
                            }}
                        >
                            <ListItemGroup
                                nameGroup={item.nameGroup}
                            />
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={MainExpenseScreenStyles.sectionHeader}>
                            <Text style={MainExpenseScreenStyles.title}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(MainExpenseScreen);