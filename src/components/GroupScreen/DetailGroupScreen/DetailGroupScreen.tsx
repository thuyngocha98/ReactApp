import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    Alert,
    FlatList,
    StatusBar,
    SectionList,
    ActivityIndicator
} from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import { Ionicons, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import HeaderTitleComponent from './HeaderTitleComponent';
import { screenWidth } from '../../../constants/Dimensions';
import ListItemContent from './ListItemContent';
import Constants from 'expo-constants';
import { BASEURL } from '../../../api/api';
import { bindActionCreators } from 'redux';
import { saveTripIdInExpense } from '../../../actions/action';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
    saveTripId?: any,
}

type States = {
    data?: any[],
    loading?: boolean,
    numberUserInTrip?: number,
}

class DetailGroupScreen extends Component<Props, States> {

    state = {
        data: [],
        loading: false,
        numberUserInTrip: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    _navListener: any;

    dataTrip = this.props.navigation.getParam('dataTrip', '');

    componentDidMount() {
        // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            this.getTransactionByTripId();
            this.props.saveTripId('');
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }


    getTransactionByTripId = async () => {
        this.setState({ loading: true })
        await fetch(`${BASEURL}/api/transaction/get_transaction_by_trip_id/${this.dataTrip._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then(async (res) => {
                await this.setState({
                    numberUserInTrip: res.numberUser,
                    data: res.data.reverse(),
                    loading: false,
                })
            })
            .catch((error) => {
                alert(error);
            });

    };

    _ItemSeparatorComponent = () => {
        return (
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    }

    render() {
        var time = this.dataTrip.create_date.split("-");
        return (
            <View style={DetailGroupScreenStyles.mainContainer}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={DetailGroupScreenStyles.header}>
                    <HeaderTitleComponent
                        navigation={this.props.navigation}
                        nameGroup={this.dataTrip.name}
                        idGroup={this.dataTrip._id}
                        startDay={this.dataTrip.startDay}
                        endDay={this.dataTrip.endDay}
                        time={this.dataTrip.create_date}
                        amount={this.dataTrip.oweUser}
                        numberUserInTrip={this.state.numberUserInTrip}
                    />
                </View>
                <View style={DetailGroupScreenStyles.dateTitle}>
                    <Text style={DetailGroupScreenStyles.date}>tháng {time[1]+" "+time[0]}</Text>
                </View>
                <View >{this.state.loading ? (
                    <View style={DetailGroupScreenStyles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={Colors.tintColor} />
                    </View>
                ) : (
                        <FlatList
                            data={this.state.data}
                            scrollEnabled
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("DetaiTransactionScreen", 
                                        { nameGroup: this.dataTrip.name, transaction: item})
                                    }}
                                >
                                    <ListItemContent
                                        data={item}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        saveTripId: tripId => saveTripIdInExpense(tripId),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGroupScreen);
