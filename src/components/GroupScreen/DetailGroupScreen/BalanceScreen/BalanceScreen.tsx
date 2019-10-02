import React, { Component } from 'react';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import BalanceScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/BalanceScreenStyles';

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
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />

            </View>
           
        );
    }
}

export default connect(mapStateToProps)(BalanceScreen);