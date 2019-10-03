import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, StatusBar, Image, Button, Alert, FlatList } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import ListItemBalance from './ListItemBalance';

function mapStateToProps(state) {
    return {

    };
}

class BalanceScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Group balances',
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                backgroundColor: Colors.tintColor,
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white
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
        isShow: false,
    }

    data = [
        {
            id: 0,
            money: "321.121,00 US$",
            name: "Nguyễn Minh Trung",
            nameSub: "vê l",
            nameSecondSub: "Nguyễn M",
            isGetBack: true,
            moneySub: "321.121, 00 US$"

        },
        {
            id: 1,
            money: "321.121,00 US$",
            name: "Thủy Ngọc Hà",
            nameSub: "Nguyễn M",
            nameSecondSub: "Hà T",
            isGetBack: false,
            moneySub: "321.121, 00 US$"
        }
    ]

    render() {
        return (
            <View style={BalanceScreenStyles.container}>
                <FlatList
                    data={this.data}
                    renderItem={({ item }) => (
                        <ListItemBalance
                            money={item.money}
                            name={item.name}
                            nameSub={item.nameSub}
                            nameSecondSub={item.nameSecondSub}
                            isGetBack={item.isGetBack}
                            moneySub={item.moneySub}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(BalanceScreen);