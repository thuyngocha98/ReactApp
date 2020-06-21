import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StatusBar, TouchableOpacity, Text, Image, FlatList, Alert, StyleSheet} from 'react-native';
import Colors from '../../../../constants/Colors';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import DetailTransactionScreenStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailTransactionScreenStyles/DetailTransactionScreenStyles';

// @ts-ignore
import list from "../../../../../assets/images/list.png";
// @ts-ignore
import camera from "../../../../../assets/images/photo-camera.png";
// @ts-ignore
import user from "../../../../../assets/images/user.png";
import ListItemDetailTransaction from './ListItemDetailTransaction';
import { number2money } from '../../../../constants/FunctionCommon';
import { BASEURL } from '../../../../api/api';
import { screenWidth } from '../../../../constants/Dimensions';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

type States = {
    data?: any[],
    loading?: boolean
}
class DetaiTransactionScreen extends Component<Props, States> {
    state ={
        data: [],
        loading: false,
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };
    transaction: any[];

    componentWillMount(){
         this.transaction = this.props.navigation.getParam('transaction', '')
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    data = [
        {
            id: 1
        },
        {
            id: 2
        }
    ]

    getDataTransaction = async () => {
        this.setState({ loading: true })
        const data = {
            trip_id: this.transaction.trip_id,
            transaction_id: this.transaction._id
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/transactionUser/get_transaction_user_by_transaction_id_and_trip_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: json
        })
            .then((response) => response.json())
            .then((res) => {
               this.setState({
                   data: res.data,
                   loading: false
               })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    };

    render() {
        const { navigation } = this.props
        const nameGroup = navigation.getParam('nameGroup', 'No Name')
        const date = this.transaction.create_date
        var time = date.split(/[\s-T]+/)
        return (
            <View style={DetailTransactionScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={DetailTransactionScreenStyles.containerHeader}>
                    <View style={DetailTransactionScreenStyles.header}>
                        <TouchableOpacity
                            style={DetailTransactionScreenStyles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-arrow-back' size={30} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={DetailTransactionScreenStyles.addContact}>Details</Text>
                        <TouchableOpacity
                            style={DetailTransactionScreenStyles.save1}
                            activeOpacity={0.5}
                            onPress={() => {

                            }}
                        >
                            <AntDesign name={'delete'} size={25} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={DetailTransactionScreenStyles.save2}
                            activeOpacity={0.5}
                            onPress={() => {

                            }}
                        >
                            <Entypo name={'edit'} color={Colors.white} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={DetailTransactionScreenStyles.details}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={DetailTransactionScreenStyles.icons}>
                                <Image source={list} />
                            </View>
                            <View style={DetailTransactionScreenStyles.contentDetails}>
                                <Text style={DetailTransactionScreenStyles.iconTravel}>{this.transaction.name}</Text>
                                <Text style={DetailTransactionScreenStyles.money}>{number2money(this.transaction.amount)} VND</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={DetailTransactionScreenStyles.personAdd}>
                            <View style={DetailTransactionScreenStyles.person}>
                                <View style={DetailTransactionScreenStyles.nameGroup}>
                                    <Image
                                        style={DetailTransactionScreenStyles.image}
                                        source={require("../../../../../assets/images/icon-home.png")}
                                    />
                                    <Text style={DetailTransactionScreenStyles.txtAllOf}>
                                        All of {nameGroup}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                                <Text style={{ fontSize: 14, marginBottom: 5, opacity: 0.5 }}>Added by you on </Text>
                                <Text style={{ fontSize: 14, opacity: 0.5 }}>ngày {time[2]} tháng {time[1]}, {time[0]}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                                <Text style={{ fontSize: 14, marginBottom: 5, opacity: 0.5 }}>Last updated by you on </Text>
                                <Text style={{ fontSize: 14, opacity: 0.5 }}>ngày {time[2]} tháng {time[1]}, {time[0]}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={DetailTransactionScreenStyles.hr}>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        scrollEnabled
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItemDetailTransaction
                                data={item}
                            />
                        )}
                        keyExtractor={item => item._id.toString()}
                    />
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(DetaiTransactionScreen);
