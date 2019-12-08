import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import MainScreenGroupStyles from '../../../styles/GroupsStyles/MainScreenGroupStyles/MainScreenGroupStyles';
import ListItemGroup from './ListItemGroup';
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { getApiListTrip } from '../../../actions/action';
import { number2money, thumbnails } from '../../../constants/FunctionCommon';

function mapStateToProps(state) {
    return {
        userId: state.dataUser.dataUser._id,
        avatar: state.dataUser.dataUser.avatar
    };
}

type Props = {
    navigation?: any,
    getListAllTrip?: any,
    listAllTrip?: [],
    dispatch?: any,
    userId?: any,
    avatar?: any,
}

type States = {
    data?: any[],
    loading?: boolean,
    total?: Number,
}

class MainScreenGroup extends Component<Props, States> {
    state = {
        data: [],
        loading: false,
        total: 0,
    }

    isOwned: boolean;

    totalMoney: Number;

    _navListener: any;

    componentWillMount() {
        this.getListAllTrip();
    }

    componentDidMount() {

        //set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            // call api get list group
            this.getListAllTrip();
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    getListAllTrip = async () => {
        if (this.props.userId != undefined) {
            this.setState({ loading: true })
            fetch(`${BASEURL}/api/transactionUser/get_total_money_user_by_id/${this.props.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
                .then((response) => response.json())
                .then(async (res) => {
                    await this.props.getListAllTrip(res.data.reverse());
                    await this.caculateTotalMoney(res.data);
                    await this.setState({
                        data: res.data,
                        loading: false,
                    })
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    async caculateTotalMoney(data) {
        this.totalMoney = 0;
        await data.forEach(element => {
            this.totalMoney += element.oweUser;
        });
        this.setState({ total: this.totalMoney })
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    };
    render() {
        const thumbnail = thumbnails["avatar" + this.props.avatar]
        return (
            <View style={MainScreenGroupStyles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                <Text style={MainScreenGroupStyles.group}>
                    Groups
                </Text>
                <View style={MainScreenGroupStyles.cartExpense}>
                    <Image
                        style={MainScreenGroupStyles.avatar}
                        source={thumbnail}
                    />
                    <View style={MainScreenGroupStyles.text}>
                        <Text style={MainScreenGroupStyles.textTotal}>Total balance</Text>
                        <Text style={MainScreenGroupStyles.textDetail}>
                            {this.state.total >= 0 ? "You are owned " + number2money(this.state.total) : "You owe " + number2money(this.state.total * (-1))}  VND
                        </Text>
                    </View>
                    <View style={MainScreenGroupStyles.menu}>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                        >
                            <MaterialCommunityIcons name='menu' size={25} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>{this.state.loading ? (
                    <View style={MainScreenGroupStyles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={Colors.tintColor} />
                    </View>
                ) : (
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                this.isOwned = item.oweUser >= 0 ? true : false,
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailGroupScreen', { dataTrip: item })
                                    }}
                                >
                                    <ListItemGroup
                                        nameGroup={item.name}
                                        price={item.oweUser}
                                        isOwned={this.isOwned}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item._id.toString()}
                            ItemSeparatorComponent={this._ItemSeparatorComponent}
                        />
                    )}
                </View>
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getListAllTrip: dataListAllTrip => getApiListTrip(dataListAllTrip)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenGroup);
