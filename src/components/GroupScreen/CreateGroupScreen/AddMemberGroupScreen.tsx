import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, FlatList, Alert, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import styles from "../../../styles/GroupsStyles/CreateGroupScreenStyles/AddMemberGroupScreenStyles";
import { EvilIcons, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
type Props = { navigation }
type States = {
    data?: any[],
    email?: string
}
class AddMemberGroupScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
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

    addEmailToList(email) {
        if (this.validateEmail(email)) {
            let newData = [...this.state.data, { email: email }];
            this.setState({
                data: newData,
                email: "",
            })
        }else{
            Alert.alert("Email invalid!")
        }
    }

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
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={styles.next}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <View style={{ flex: 1 }}>
                            <EvilIcons name='search' size={25} style={{ marginRight: 5, marginTop: 3 }} />
                        </View>
                        <TextInput
                            style={{ flex: 8 }}
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            autoFocus
                            autoCapitalize={'none'}
                            placeholder={'Enter email...'}
                        />
                        <TouchableOpacity
                            style={styles.iconAdd}
                            onPress={() => {
                                this.addEmailToList(this.state.email);
                            }}
                        >
                            <AntDesign name='adduser' size={25} style={{ marginTop: 3 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewContent}                >
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <View style={styles.viewEmail}>
                                <Text style={styles.textEmail}>{item.email}</Text>
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

export default AddMemberGroupScreen;
