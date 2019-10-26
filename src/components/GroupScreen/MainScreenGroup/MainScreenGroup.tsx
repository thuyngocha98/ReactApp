import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import MainScreenGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/MainScreenGroupStyles';
import ListItemGroup from './ListItemGroup';
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function mapStateToProps(state) {
    return {
        
    };
}

type Props = {
    navigation?: any,
    dataUser?: any[],
}

const data = [
    {
        id: 0,
        nameGroup: 'Group 1',
        detail: 'you are owned',
        price: '51,000$',
        isOwned: true,
    },
    {
        id: 1,
        nameGroup: 'Da lat trip',
        detail: 'you are owned',
        price: '200,000$',
        isOwned: true,
    },
    {
        id: 2,
        nameGroup: 'Vung Tau Trip',
        detail: 'you are owed',
        price: '100,000$',
        isOwned: false,
    },
];

class MainScreenGroup extends Component<Props> {
    _navListener: any;

    componentDidMount() {

        // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    _ItemSeparatorComponent = () => {
        return(
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    };
    render() {
        return (
            <View style={MainScreenGroupStyles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                <Text style={MainScreenGroupStyles.group}>
                    Groups
                </Text>
                <View style={MainScreenGroupStyles.cartExpense}>
                    <Image
                        style={MainScreenGroupStyles.avatar}
                        source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB' }}
                    />
                    <View style={MainScreenGroupStyles.text}>
                        <Text style={MainScreenGroupStyles.textTotal}>Total balance</Text>
                        <Text style={MainScreenGroupStyles.textDetail}>You are owned 1,167,00 US$</Text>
                    </View>
                    <View style={MainScreenGroupStyles.menu}>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert("Menu")
                            }}
                        >
                            <MaterialCommunityIcons name='menu' size={25} color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('DetailGroupScreen', {nameGroup: item.nameGroup})
                                }}
                            >
                                <ListItemGroup
                                    nameGroup={item.nameGroup}
                                    detail={item.detail}
                                    price={item.price}
                                    isOwned={item.isOwned}
                                    // data={item.data}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this._ItemSeparatorComponent}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(MainScreenGroup);
