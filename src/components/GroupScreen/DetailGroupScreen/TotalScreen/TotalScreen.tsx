import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, StatusBar, Image, Button, Alert, FlatList } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { APPBAR_HEIGHT } from '../../../../constants/Dimensions';
import TotalScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/TotalScreen/TotalScreenStyles';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    title?: string,
    navigation?: any,
}

type States = {
    colorThisMonth?: boolean,
    colorLastMonth?: boolean,
    colorAllTime?: boolean,
}

class TotalScreen extends Component<Props, States> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Group spending summary',
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                backgroundColor: Colors.tintColor,
                height: APPBAR_HEIGHT
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white,
                fontSize: 18,
            },
            headerRight:
                (
                    <View style={BalanceScreenStyles.headerRight} >
                    </View>
                ),
            headerLeft:
                (
                    <View style={BalanceScreenStyles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={BalanceScreenStyles.textHeaderLeft}>Cancel</Text>
                        </TouchableOpacity>
                    </View >
                )
        };
    };

    state = {
        colorThisMonth: true,
        colorLastMonth: false,
        colorAllTime: false,
    };

    _selectCategoryGroupType(index) {
        switch (index) {
            case 1:
                this.setState({
                    colorThisMonth: true,
                    colorLastMonth: false,
                    colorAllTime: false,
                });
                break;
            case 2:
                this.setState({
                    colorThisMonth: false,
                    colorLastMonth: true,
                    colorAllTime: false,
                });
                break;
            case 3:
                this.setState({
                    colorThisMonth: false,
                    colorLastMonth: false,
                    colorAllTime: true,
                });
                break;
        }
    }

    render() {
        const nameGroup = this.props.navigation.getParam('nameGroup', 'NO NAME')
        return (
            <View style={TotalScreenStyles.container}>
                <View style={TotalScreenStyles.title}>
                    <Text style={TotalScreenStyles.nameGroup}>{nameGroup}</Text>
                </View>
                <View style={TotalScreenStyles.timeType}>
                    <View style={TotalScreenStyles.categoryType}>
                        <TouchableOpacity
                            style={{ flex: 2 }}
                            onPress={() => {
                                this._selectCategoryGroupType(1);
                            }}
                        >
                            <Text
                                style={[TotalScreenStyles.thisMonth,
                                [{
                                    backgroundColor: this.state.colorThisMonth
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorThisMonth
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            > This month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 2 }}
                            onPress={() => {
                                this._selectCategoryGroupType(2);
                            }}
                        >
                            <Text
                                style={[TotalScreenStyles.lastMonth,
                                [{
                                    backgroundColor: this.state.colorLastMonth
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorLastMonth
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            >Last month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1.6 }}
                            onPress={() => {
                                this._selectCategoryGroupType(3);
                            }}
                        >
                            <Text
                                style={[TotalScreenStyles.allTime,
                                [{
                                    backgroundColor: this.state.colorAllTime
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorAllTime
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            >All time</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={TotalScreenStyles.viewTotal}>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Total group spending</Text>
                            <Text style={TotalScreenStyles.moneyGreen}>610.502,00 US$</Text>
                        </View>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Total you paid for</Text>
                            <Text style={TotalScreenStyles.moneyGreen}>610.452,00 US$</Text>
                        </View>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Your total share</Text>
                            <Text style={TotalScreenStyles.moneyRed}>305.301,00 US$</Text>
                        </View>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Payments made</Text>
                            <Text style={TotalScreenStyles.moneyGray}>0,00 US$</Text>
                        </View>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Payments received</Text>
                            <Text style={TotalScreenStyles.moneyGray}>0,00 US$</Text>
                        </View>
                        <View style={TotalScreenStyles.group}>
                            <Text style={TotalScreenStyles.totalName}>Total change in balance</Text>
                            <Text style={TotalScreenStyles.moneyGreen}>305.151,00 US$</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(TotalScreen);