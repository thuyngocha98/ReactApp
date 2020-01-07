import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, SectionList, TouchableOpacity, StatusBar, Alert, FlatList } from 'react-native';
import MainExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/MainExpenseScreenStyles/MainExpenseScreenStyles';
import ListItemGroup from './ListItemGroup';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';

function mapStateToProps(state) {
    return {
        listAllTrip: state.listAllTrip.listAllTrip
    };
}

type Props = {
    navigation?: any,
    listAllTrip?: any,
}

type States = {
    data?: any[],
    stateCurrentGroup?: boolean,
}

class MainExpenseScreen extends Component<Props, States> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };
    _navListener: any;
    state = {
        stateCurrentGroup: false,
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
            const currentGroup = this.props.navigation.getParam('currentGroup', '');
            if (this.props.listAllTrip.length > 0 && currentGroup == '')
                this.props.navigation.navigate('InputExpenseScreen', { dataGroup: this.props.listAllTrip[0] })
        });
    }



    componentWillUnmount() {
        // remove barstyle
        this._navListener.remove();
    }

    render() {
        const { navigation } = this.props
        const currentGroup = this.props.navigation.getParam('currentGroup', '');
        return (
            <View style={MainExpenseScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />

                <View style={MainExpenseScreenStyles.containerHeader}>
                    <View style={MainExpenseScreenStyles.header}>
                        <TouchableOpacity
                            style={MainExpenseScreenStyles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {

                            }}
                        >
                            <Ionicons name='ios-close' size={45} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={MainExpenseScreenStyles.addContact}>Add an expense</Text>
                        <TouchableOpacity
                            style={MainExpenseScreenStyles.save}
                            activeOpacity={0.5}
                            onPress={() => {

                            }}
                        >
                            <Text
                                style={[MainExpenseScreenStyles.add, { opacity: 0.6 }]}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={MainExpenseScreenStyles.header1}>
                    <Text style={MainExpenseScreenStyles.headerTitle}>
                        Select a group
                    </Text>
                </View>
                <View style={MainExpenseScreenStyles.sectionHeader}>
                    <Text style={MainExpenseScreenStyles.title}>Group</Text>
                </View>
                <View>{this.state.data.length > 0 && currentGroup !== "" ? (
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
                ) : (
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: screenWidth/20.55}}>
                            <Text>You don't have group yet, please create group first.</Text>
                    </View>
                )}

                </View>

            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(MainExpenseScreen);
