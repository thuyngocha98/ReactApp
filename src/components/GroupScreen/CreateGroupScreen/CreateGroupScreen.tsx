import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Alert, Image, TextInput, Switch, StatusBar } from 'react-native';
import Colors from '../../../constants/Colors';
import CreateGroupScreenStyles from '../../../styles/GroupsStyles/CreateGroupScreenStyles/CreateGroupScreenStyles';

function mapStateToProps(state) {
    return {

    };
}

type State = {
    colorApartment?: boolean,
    colorHouse?: boolean,
    colorTrip?: boolean,
    colorOrder?: boolean,
}

class CreateGroupScreen extends Component<State> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create a group',
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
                    <View style={CreateGroupScreenStyles.headerRight}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AddMemberGroupScreen")
                            }}
                        >
                            <Text style={CreateGroupScreenStyles.textHeaderRight}>Next</Text>
                        </TouchableOpacity>
                    </View>
                ),
            headerLeft:
                (
                    <View style={CreateGroupScreenStyles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={CreateGroupScreenStyles.textHeaderLeft}>Cancel</Text>
                        </TouchableOpacity>
                    </View >
                )
        };
    };

    state = {
        colorApartment: true,
        colorHouse: false,
        colorTrip: false,
        colorOrder: false,
    };

    _selectCategoryGroupType(index) {
        switch(index){
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
    render() {
        return (
            <View style={CreateGroupScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={CreateGroupScreenStyles.categoryGroupName}>
                    <Image
                        style={CreateGroupScreenStyles.iconCamera}
                        source={require("../../../../assets/images/icon_camera.png")}
                    />
                    <View style={CreateGroupScreenStyles.nameAndDetail}>
                        <Text style={CreateGroupScreenStyles.groupName}>Group Name</Text>
                        <TextInput
                            style={CreateGroupScreenStyles.detail}
                            placeholder={"132 Sesame Street"}
                            autoFocus={true}
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
            </View>
        );
    }
}

export default connect(mapStateToProps)(CreateGroupScreen);
