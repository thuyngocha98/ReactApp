import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, FlatList, Alert, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import { connect } from 'react-redux';
import styles from "../../../styles/GroupsStyles/CreateGroupScreenStyles/AddMemberGroupScreenStyles";
import { EvilIcons, MaterialCommunityIcons, AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { BASEURL } from '../../../api/api';

function mapStateToProps(state) {
    return {
        user_id: state.dataUser.dataUser._id
    };
}

type Props = { 
    navigation?: any,
    user_id?: any[]
}

type States = {
    data?: any[],
    email?: string,
    name?: string,
}
class AddMemberGroupScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };
    emailTextInput: TextInput;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
            name: '',
        };
    }


    goBackFriendsScreen = () => {
        this.props.navigation.goBack();
    };

    deleteEmailFromList(email) {
        let newData = this.state.data.filter(function (obj) {
            return obj.email !== email;
        })
        this.setState({
            data: newData
        })
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    addEmailToList(name, email) {
        if (name === "" || email === "") {
            Alert.alert("Please enter full infomation.")
        } else {
            let check = this.state.data.some((item, i) => {
                if (item.name === name || item.email === email) {
                    return true;
                }
            })
            if (check) {
                Alert.alert("Name or Email already exists");
            } else {
                if (this.validateEmail(email)) {
                    let newData = [...this.state.data, { name: name, email: email }];
                    this.setState({
                        data: newData,
                        email: "",
                        name: "",
                    })
                } else {
                    Alert.alert("Email invalid!")
                }
            }
        }
    }

    createTrip = async () => {
        const data = {
            name: this.props.navigation.getParam('nameGroup', 'No name'),
            author: this.props.user_id,
            list_user: this.state.data,
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/trip/insert_new_trip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: json
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    Alert.alert(res.error.message);
                } else {
                    Alert.alert(
                        'Create successful',
                        ``,
                        [
                            {
                                text: 'OK', onPress: () => {
                                    this.props.navigation.navigate("GroupScreen")
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={{ backgroundColor: Colors.tabIconSelected }}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.goBackFriendsScreen}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.addFriends}>Add Members</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this.createTrip();
                            }}
                        >
                            <Text style={styles.next}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <View style={styles.iconSearch}>
                            <FontAwesome name='user' size={25} color={Colors.gray} />
                        </View>
                        <TextInput
                            style={{ flex: 8 }}
                            keyboardType='default'
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { this.emailTextInput.focus(); }}
                            blurOnSubmit={false}
                            autoCorrect={false}
                            autoFocus
                            autoCapitalize={'words'}
                            placeholder={'Enter name...'}
                        />
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={styles.input1}>
                        <View style={styles.iconSearch}>
                            <MaterialCommunityIcons name='email' size={25} color={Colors.gray} />
                        </View>
                        <TextInput
                            style={{ flex: 8 }}
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({ email: text })}
                            ref={(input) => { this.emailTextInput = input; }}
                            value={this.state.email}
                            autoCapitalize={'none'}
                            placeholder={'Enter email...'}
                        />
                        <TouchableOpacity
                            style={styles.iconAdd}
                            onPress={() => {
                                this.addEmailToList(this.state.name, this.state.email);
                            }}
                        >
                            <AntDesign name='adduser' size={25} style={{ marginTop: 3 }} color={Colors.gray} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewContent}>
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <View style={styles.viewEmail}>
                                <View style={styles.nameAndMail}>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.textEmail}>{item.email}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.deleteEmailFromList(item.email)
                                    }}
                                >
                                    <Feather name="delete" size={25} />
                                </TouchableOpacity>

                            </View>
                        )}
                        keyExtractor={item => item.email}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(AddMemberGroupScreen);
