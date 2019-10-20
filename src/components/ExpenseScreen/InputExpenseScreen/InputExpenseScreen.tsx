import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APPBAR_HEIGHT } from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';
import { View, TouchableOpacity, Text, Image, TextInput, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import InputExpenseScreenStyles from '../../../styles/ExpenseScreenStyles/InputExpenseScreenStyles/InputExpenseScreenStyles';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class InputExpenseScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add an expense",
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                height: APPBAR_HEIGHT,
                backgroundColor: Colors.tintColor,
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white
            },
            headerRight:
                (
                    <View style={{ marginRight: 15 }}>
                        <Text style={{ fontSize: 17, color: Colors.white, opacity: 0.6 }}>Save</Text>
                    </View>
                ),
            headerLeft:
                (
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-close' size={45} color={Colors.white} />
                        </TouchableOpacity>
                    </View >
                )
        };
    };

    render() {
        const { navigation } = this.props
        const nameGroup = navigation.getParam('nameGroup', 'Name-Group')
        return (
            <View style={InputExpenseScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={InputExpenseScreenStyles.header}>
                    <Text style={InputExpenseScreenStyles.txt1}>
                        With
                        <Text style={InputExpenseScreenStyles.txt2}>
                            {" you "}
                        </Text>
                        and:
                    </Text>
                    <View style={InputExpenseScreenStyles.nameGroup}>
                        <Image
                            style={InputExpenseScreenStyles.image}
                            source={require("../../../../assets/images/icon-home.png")}
                        />
                        <Text style={InputExpenseScreenStyles.txtAllOf}>
                            All of {nameGroup}
                        </Text>
                    </View>
                </View>
                <View style={InputExpenseScreenStyles.underLine} />
                <View style={InputExpenseScreenStyles.sectionInput}>
                    <View style={InputExpenseScreenStyles.sectionDescription}>
                        <View style={InputExpenseScreenStyles.iconDescription}>
                            <MaterialIcons name="description" size={40} color={Colors.blackText} style={{ padding: 5, }} />
                        </View>
                        <View style={InputExpenseScreenStyles.inputDescription}>
                            <TextInput
                                style={InputExpenseScreenStyles.txtInputDescription}
                                placeholder="Enter a description"
                                autoFocus
                            />
                            <View style={InputExpenseScreenStyles.underLineInput} />
                        </View>

                    </View>
                    <View style={InputExpenseScreenStyles.sectionMoney}>
                        <View style={InputExpenseScreenStyles.iconMoney}>
                            <Ionicons name="logo-usd" size={40} color={Colors.blackText} style={{ paddingLeft: 13, paddingRight: 13, padding: 5 }} />
                        </View>
                        <View style={InputExpenseScreenStyles.inputMoney}>
                            <TextInput
                                style={InputExpenseScreenStyles.txtInputMoney}
                                keyboardType='number-pad'
                                placeholder="0,00"
                            />
                            <View style={InputExpenseScreenStyles.underLineInput} />
                        </View>

                    </View>
                    <View style={InputExpenseScreenStyles.btnSubmit}>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate("ExpenseDetailScreen")
                            }}
                        >
                            <Text style={InputExpenseScreenStyles.txtSubmit}>
                                Paid by you and split equally
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(InputExpenseScreen);