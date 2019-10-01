import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Animated, ScrollView, Alert, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import { Ionicons, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import HeaderTitleComponent from './HeaderTitleComponent';
import { screenWidth } from '../../../constants/Dimensions';
import ListItemContent from './ListItemContent';

function mapStateToProps(state) {
    return {

    };
}


class DetailGroupScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                elevation: 0,
                backgroundColor: Colors.tintColor,
                height: 250,
            },
            headerTitle: <HeaderTitleComponent />,
            headerRight:
                (
                    <View style={DetailGroupScreenStyles.headerRight}>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(screenWidth.toString())
                            }}
                        >
                            <Ionicons name='ios-settings' size={30} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                ),
            headerLeft:
                (
                    <View style={DetailGroupScreenStyles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-arrow-back' size={30} color={Colors.white} />
                        </TouchableOpacity>
                    </View >
                ),
            headerRightContainerStyle: {
                alignItems: 'flex-start',
            },
            headerLeftContainerStyle: {
                alignItems: 'flex-start',
            }
        };
    };

    data = [
        {
            id: 0,
            month: "thg 9",
            day: "25",
            title: "Hotel",
            detail: "You paid 200,00 US$",
            titleMoney: "you lent",
            money: "100,00 US$"
        },
        {
            id: 1,
            month: "thg 9",
            day: "26",
            title: "Restaurant",
            detail: "You paid 500,00 US$",
            titleMoney: "you lent",
            money: "250,00 US$"
        },
        {
            id: 2,
            month: "thg 9",
            day: "27",
            title: "Dinner",
            detail: "You paid 50,00 US$",
            titleMoney: "you lent",
            money: "20,00 US$"
        }
    ]

    _ItemSeparatorComponent = () => {
        return (
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    }

    handleLoadMore = () => {
        Alert.alert("aaa")
    }

    render() {
        return (
            <View style={DetailGroupScreenStyles.mainContainer}>
                <View style={DetailGroupScreenStyles.dateTitle}>
                    <Text style={DetailGroupScreenStyles.date}>tháng 9 2019</Text>
                </View>
                <FlatList
                    data={this.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(item.title)
                            }}
                        >
                            <ListItemContent
                                month={item.month}
                                day={item.day}
                                title={item.title}
                                detail={item.detail}
                                titleMoney={item.titleMoney}
                                money={item.money}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(DetailGroupScreen);