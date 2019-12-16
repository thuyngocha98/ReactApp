import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Alert, Image, TextInput, Switch, StatusBar, Button, Keyboard, ToastAndroid } from 'react-native';
import Colors from '../../../constants/Colors';
import CreateGroupScreenStyles from '../../../styles/GroupsStyles/CreateGroupScreenStyles/CreateGroupScreenStyles';
import DateTimePicker from "react-native-modal-datetime-picker";

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

type States = {
    colorApartment?: boolean,
    colorHouse?: boolean,
    colorTrip?: boolean,
    colorOrder?: boolean,
    name?: string,
    checkInputName?: boolean,
    isDateTimePickerVisible?:boolean,
    isDateTimePickerVisible1?: boolean,
    startDay?: string,
    endDay?: string,
}

class CreateGroupScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };
    state = {
        colorApartment: true,
        colorHouse: false,
        colorTrip: false,
        colorOrder: false,
        name: '',
        checkInputName: false,
        isDateTimePickerVisible: false,
        isDateTimePickerVisible1: false,
        startDay: 'Select Start Day',
        endDay: 'Select End Day',
    };
    _navListener: any;

    componentDidMount() {
        // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    _checkInputName(text) {
        if(text === ""){
            this.setState({
                checkInputName: false,
                name: text,
            })
        }else{
            this.setState({
                checkInputName: true,
                name: text,
            })
        }
    }

    _selectCategoryGroupType(index) {
        switch (index) {
            case 1:
                this.setState({
                    colorApartment: true,
                    colorHouse: false,
                    colorTrip: false,
                    colorOrder: false
                });
                break;
            case 2:
                this.setState({
                    colorApartment: false,
                    colorHouse: true,
                    colorTrip: false,
                    colorOrder: false
                });
                break;
            case 3:
                this.setState({
                    colorApartment: false,
                    colorHouse: false,
                    colorTrip: true,
                    colorOrder: false
                });
                break;
            case 4:
                this.setState({
                    colorApartment: false,
                    colorHouse: false,
                    colorTrip: false,
                    colorOrder: true
                });
                break;
        }
    }

    // Date time picker start day
    showDateTimePicker = () => {
        Keyboard.dismiss();
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            startDay: date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()

        })
        this.hideDateTimePicker();
    };

    // Date time picker end day
    showDateTimePicker1 = () => {
        Keyboard.dismiss();
        this.setState({ isDateTimePickerVisible1: true });
    };

    hideDateTimePicker1 = () => {
        this.setState({ isDateTimePickerVisible1: false });
    };

    handleDatePicked1 = date => {
        this.setState({
            endDay: date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        })
        this.hideDateTimePicker1();
    };

    checkCondition(){
        if(this.state.checkInputName){
            if(this.state.startDay !== 'Select Start Day'){
                if(this.state.endDay !== 'Select End Day'){
                    this.props.navigation.navigate("AddMemberGroupScreen", { nameGroup: this.state.name, startDay: this.state.startDay, endDay: this.state.endDay })
                }else{
                    ToastAndroid.showWithGravityAndOffset(
                        'Please select end day!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                }
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    'Please select start day!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        }else{
            ToastAndroid.showWithGravityAndOffset(
                'Please input name group!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={CreateGroupScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={CreateGroupScreenStyles.containerHeader}>
                    <View style={CreateGroupScreenStyles.header}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={CreateGroupScreenStyles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={CreateGroupScreenStyles.addContact}>Add new Contact</Text>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={() => {
                                this.checkCondition();
                            }}
                        >
                            <Text 
                                style={[CreateGroupScreenStyles.add,{opacity: this.state.checkInputName ? 1 : 0.5}]}
                            >
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={CreateGroupScreenStyles.categoryGroupName}>
                    <Image
                        style={CreateGroupScreenStyles.iconCamera}
                        source={require("../../../../assets/images/icon_camera.png")}
                    />
                    <View style={CreateGroupScreenStyles.nameAndDetail}>
                        <Text style={CreateGroupScreenStyles.groupName}>Group Name</Text>
                        <TextInput
                            style={CreateGroupScreenStyles.detail}
                            onChangeText={(text) => { this._checkInputName(text); }}
                            value={this.state.name}
                            autoCapitalize='words'
                            placeholder={"132 Sesame Street"}
                            autoFocus={true}
                            keyboardType='default'
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <View style={CreateGroupScreenStyles.categoryGroupType}>
                    <Text style={CreateGroupScreenStyles.groupType}>Group Type</Text>
                    <View style={CreateGroupScreenStyles.categoryTypeGroup}>
                        <TouchableOpacity
                            style={{ flex: 2 }}
                            onPress={() => {
                                this._selectCategoryGroupType(1);
                            }}
                        >
                            <Text
                                style={[CreateGroupScreenStyles.apartment,
                                [{
                                    backgroundColor: this.state.colorApartment
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorApartment
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            > Apartment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1.5 }}
                            onPress={() => {
                                this._selectCategoryGroupType(2);
                            }}
                        >
                            <Text
                                style={[CreateGroupScreenStyles.house,
                                [{
                                    backgroundColor: this.state.colorHouse
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorHouse
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            >House</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => {
                                this._selectCategoryGroupType(3);
                            }}
                        >
                            <Text
                                style={[CreateGroupScreenStyles.trip,
                                [{
                                    backgroundColor: this.state.colorTrip
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorTrip
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            >Trip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1.5 }}
                            onPress={() => {
                                this._selectCategoryGroupType(4);
                            }}
                        >
                            <Text
                                style={[CreateGroupScreenStyles.order,
                                [{
                                    backgroundColor: this.state.colorOrder
                                        ? Colors.tintColor : Colors.white,
                                    color: this.state.colorOrder
                                        ? Colors.white : Colors.tintColor,
                                }]]}
                            >Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={CreateGroupScreenStyles.pickDate}>
                    <Button 
                        title={this.state.startDay !== "Select Start Day" ? 'From '+this.state.startDay: this.state.startDay} 
                        onPress={this.showDateTimePicker} 
                    />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
                <View style={CreateGroupScreenStyles.pickDate1}>
                    <Button 
                        title={this.state.endDay !== "Select End Day" ? 'To ' + this.state.endDay : this.state.endDay} 
                        onPress={this.showDateTimePicker1} 
                    />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible1}
                        onConfirm={this.handleDatePicked1}
                        onCancel={this.hideDateTimePicker1}
                        mode={'date'}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(CreateGroupScreen);
