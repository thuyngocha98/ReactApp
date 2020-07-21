import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StatusBar,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import HeaderTitleComponent from './HeaderTitleComponent';
import {screenWidth} from '../../../constants/Dimensions';
import ListItemContent from './ListItemContent';
import {BASEURL} from '../../../api/api';
import {bindActionCreators} from 'redux';
import {saveTripIdInExpense} from '../../../actions/action';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from 'react-native-modal';

function mapStateToProps(state) {
    return {};
}

type Props = {
    navigation?: any,
    saveTripId?: any,
}

type States = {
    data?: any[],
    loading?: boolean,
    numberUserInTrip?: number,
    modalVisible?: boolean,
}

class DetailGroupScreen extends Component<Props, States> {

    state = {
        data: [],
        loading: false,
        numberUserInTrip: 0,
        modalVisible: false,
    }

    static navigationOptions = ({navigation}) => {
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

    addImage() {
        this.setState({modalVisible: !this.state.modalVisible});
        this.props.navigation.navigate('AddImagesScreen', { tripId: this.dataTrip._id })
    }


    getTransactionByTripId = async () => {
        this.setState({loading: true})
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
            <View style={{flex: 1, height: 1, backgroundColor: Colors.lightgray}}/>
        );
    };
    
    render() {
        const time = this.dataTrip.create_date.split("-");
        return (
            <View style={DetailGroupScreenStyles.mainContainer}>
                {/* view modal */}
                <Modal
                isVisible={this.state.modalVisible}
                style={DetailGroupScreenStyles.mainModal}
                coverScreen={false}
                deviceHeight={Dimensions.get('screen').height}
                onBackdropPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                >
                    <View style={DetailGroupScreenStyles.viewModal}>
                        <TouchableOpacity style={DetailGroupScreenStyles.viewItemModal}>
                            <MaterialIcons name={'note-add'} color={Colors.tintColor} size={screenWidth / 14}/>
                            <Text style={DetailGroupScreenStyles.txtItemModal}>Expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={DetailGroupScreenStyles.viewItemModal}>
                            <MaterialIcons name={'add-location'} color={Colors.splitWise} size={screenWidth / 14}/>
                            <Text style={DetailGroupScreenStyles.txtItemModal}>Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this.addImage()}
                        style={DetailGroupScreenStyles.viewItemModal}>
                            <MaterialIcons name={'library-add'} color={Colors.mediumseagreen} size={screenWidth / 14}/>
                            <Text style={DetailGroupScreenStyles.txtItemModal}>Image</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent/>
                <View style={DetailGroupScreenStyles.header}>
                    <HeaderTitleComponent
                        navigation={this.props.navigation}
                        nameGroup={this.dataTrip.name}
                        idGroup={this.dataTrip._id}
                        // startDay={this.dataTrip.startDay}
                        // endDay={this.dataTrip.endDay}
                        time={this.dataTrip.create_date}
                        amount={this.dataTrip.oweUser}
                        numberUserInTrip={this.state.numberUserInTrip}
                    />
                </View>
                <View style={DetailGroupScreenStyles.dateTitle}>
                    <Text style={DetailGroupScreenStyles.date}>tháng {time[1] + " " + time[0]}</Text>
                </View>
                <View>{this.state.loading ? (
                    <View style={DetailGroupScreenStyles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={Colors.tintColor}/>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.data}
                        scrollEnabled
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("DetaiTransactionScreen",
                                        {nameGroup: this.dataTrip.name, transaction: item})
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
                {/* <TouchableOpacity style={DetailGroupScreenStyles.addTrip}
                                  activeOpacity={0.5}
                                  onPress={() => this.props.navigation.navigate('ChatGroupScreen', {
                                      dataTrip: this.dataTrip,
                                      navigation: this.props.navigation
                                  })}
                >
                    <MaterialCommunityIcons name={'wechat'} color={Colors.white}
                                            size={screenWidth / 9}/>
                </TouchableOpacity> */}
                {this.state.modalVisible ? (null) : (
                    <TouchableOpacity style={DetailGroupScreenStyles.addTrip}
                    activeOpacity={0.5}
                    onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
                    >
                        <MaterialIcons name={'add'} color={Colors.white} size={screenWidth / 9}/>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        saveTripId: tripId => saveTripIdInExpense(tripId),
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGroupScreen);
