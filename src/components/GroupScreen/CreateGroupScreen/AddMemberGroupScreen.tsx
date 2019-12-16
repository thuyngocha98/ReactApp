import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, FlatList, Alert, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import Colors from "../../../constants/Colors";
import { connect } from 'react-redux';
import styles from "../../../styles/GroupsStyles/CreateGroupScreenStyles/AddMemberGroupScreenStyles";
import { MaterialCommunityIcons, AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { BASEURL } from '../../../api/api';
import DialogBox from 'react-native-dialogbox';

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
    dataUserExist?: any[],
    data?: any[],
    email?: string,
    name?: string,
    showUserExists?: boolean
}
class AddMemberGroupScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };
    emailTextInput: TextInput;
    dialogbox: any;

    constructor(props) {
        super(props);
        this.state = {
            dataUserExist: [],
            data: [],
            email: '',
            name: '',
            showUserExists: false,
        };
    }

    handleOnPress(title, content) {
        Keyboard.dismiss()
        // alert
        this.dialogbox.tip({
            title: title,
            content: content,
            btn: {
                text: 'OK',
                style: { fontWeight: '500', fontSize: 20, color: "#044de0" },
            },
        });
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
        this.setState({dataUserExist: []})
        if (name === "" || email === "") {
            this.handleOnPress("Error!", ["Information missing!!!", "Please enter full infomation.."])

        } else {
            let check = this.state.data.some((item, i) => {
                if (item.name === name || item.email === email) {
                    return true;
                }
            })
            if (check) {
                this.handleOnPress("Error!", ["Name or Email already exists!", "Please check again."])
            } else {
                if (this.validateEmail(email)) {
                    let newData = [...this.state.data, { name: name, email: email }];
                    this.setState({
                        data: newData,
                        email: "",
                        name: "",
                    })
                } else {
                    this.handleOnPress("Error!", ["Email invalid!", "Please check again."])
                }
            }
        }
    }

    createTrip = async () => {
        const data = {
            name: this.props.navigation.getParam('nameGroup', 'No name'),
            startDay: this.props.navigation.getParam('startDay', '0-0-0000'),
            endDay: this.props.navigation.getParam('endDay', '0-0-0000'),
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
                    Keyboard.dismiss()
                    this.dialogbox.tip({
                        title: "Error!",
                        content: [res.error, "Please enter another group name."],
                        btn: {
                            text: 'OK',
                            style: { fontWeight: '500', fontSize: 20, color: "#044de0" },
                            callback: () => {
                                this.props.navigation.navigate("CreateGroupScreen")
                            },
                        },
                    });
                } else {
                    Keyboard.dismiss()
                    this.props.navigation.navigate("GroupScreen")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    listenerInputEmail(text) {
        if(text.length <= 2)
            this.setState({ showUserExists: false })
        else if (this.state.dataUserExist.length > 0) {
            if (this.state.dataUserExist[0].email.indexOf(text) < 0) {
                this.setState({ showUserExists: false })
            }
            else
                this.setState({ showUserExists: true })
        }

        this.setState({ email: text })
        if ((text.indexOf('@') > -1) && text[text.length - 1] === '@') {
            this.checkUserExist(text);
        }
    }

    checkUserExist = async email => {
        const data = {
            email: email
        };
        const json = JSON.stringify(data);
        fetch(`${BASEURL}/api/user/check_user_exists`, {
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
                    dataUserExist: res.data,
                })
                if (res.data.length > 0)
                    this.setState({
                        showUserExists: true,
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container} >
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={{ backgroundColor: Colors.tabIconSelected }} >
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
                            <MaterialCommunityIcons name='email' size={25} color={Colors.gray} />
                        </View>
                        <TextInput
                            style={{ flex: 8 }}
                            keyboardType='email-address'
                            onChangeText={(text) => this.listenerInputEmail(text)}
                            onSubmitEditing={() => { this.emailTextInput.focus(); }}
                            value={this.state.email}
                            returnKeyType={'next'}
                            autoCapitalize={'none'}
                            placeholder={'Enter email...'}
                            autoFocus
                        />
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={styles.input1}>
                        <View style={styles.iconSearch}>
                            <FontAwesome name='user' size={25} color={Colors.gray} />
                        </View>
                        <TextInput
                            style={{ flex: 8 }}
                            keyboardType='default'
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            ref={(input) => { this.emailTextInput = input; }}
                            blurOnSubmit={false}
                            autoCorrect={false}
                            autoCapitalize={'words'}
                            placeholder={'Enter name...'}
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
                    <View style={styles.popuplist}>
                        {this.state.showUserExists ? (
                            <FlatList
                                scrollEnabled
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps='always'
                                data={this.state.dataUserExist}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => { this.addEmailToList(item.name, item.email),this.setState({ showUserExists: false }) }}
                                    >
                                        <View style={styles.userExists}>
                                            <Text style={styles.username}>{item.name}</Text>
                                            <Text style={styles.email}>{item.email}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item._id.toString()}
                            />
                        ) : (null)}
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
                <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }} isOverlayClickClose={false} style={{ backgroundColor: "#333" }} />
            </View>
        );
    }
}

export default connect(mapStateToProps)(AddMemberGroupScreen);
