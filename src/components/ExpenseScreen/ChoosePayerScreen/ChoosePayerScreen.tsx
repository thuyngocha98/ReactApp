import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import ChoosePayerScreenStyles from '../../../styles/ExpenseScreenStyles/ChoosePayerScreenStyles/ChoosePayerScreenStyles';
import ListItemPayer from './ListItemPayer';
import { Octicons } from '@expo/vector-icons';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any
}

type States = {
    indexCheck?: number,
}

class ChoosePayerScreen extends Component<Props, States> {
    state = {
        indexCheck: 0,
    }
    listUser: any[]

    isCheck: boolean
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };
    
    render() {
        const { navigation } = this.props
        this.listUser = navigation.getParam('listUser', "");
        const totalMoney = navigation.getParam('totalMoney', '0');
        const list_user = navigation.getParam('list_user', '');
        return (
            <View style={ChoosePayerScreenStyles.container}>
                <View style={ChoosePayerScreenStyles.containerHeader}>
                    <View style={ChoosePayerScreenStyles.header}>
                        <TouchableOpacity
                            style={ChoosePayerScreenStyles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate("InputExpenseScreen", { IdPayer: this.listUser[this.state.indexCheck].user_id._id});
                            }}
                        >
                            <Text style={ChoosePayerScreenStyles.textHeaderLeft}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={ChoosePayerScreenStyles.addContact}>Choose Payer</Text>
                        <View style={ChoosePayerScreenStyles.save} />
                    </View>
                </View>
                <View style={ChoosePayerScreenStyles.flatlist}>
                    <FlatList
                        data={this.listUser}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                            this.isCheck = this.state.indexCheck === index ? true : false,
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { this.setState({ indexCheck : index}) }}
                            >
                                <ListItemPayer
                                    name={item.user_id.name}
                                    isCheck={this.isCheck}
                                    avatar={item.user_id.avatar}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity style={ChoosePayerScreenStyles.multiple}
                    activeOpacity={0.6}
                    onPress={() => {
                        this.props.navigation.navigate('ChooseMultiplePeopleScreen', { list_user: list_user, listUser: this.listUser, totalMoney: totalMoney})
                    }}
                >
                    <View style={ChoosePayerScreenStyles.multiplePeople}>
                        <View style={ChoosePayerScreenStyles.title}>
                            <Text style={ChoosePayerScreenStyles.txt}>Multiple people</Text>
                        </View>
                        <View style={ChoosePayerScreenStyles.iconRight}>
                            <Octicons name='chevron-right' size={25} color={Colors.lightgray} />
                        </View>
                    </View>
                    <View style={ChoosePayerScreenStyles.underLine} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ChoosePayerScreen);