import React, {Component} from 'react';
import {Alert, Text, TouchableOpacity, View, TextInput, FlatList} from "react-native";
import io from "socket.io-client";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import ChatGroupScreenStyles from "../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons1 from "react-native-vector-icons/Ionicons";


type Props = {
    navigation?: any,
    nameGroup?: any
}

type States = {
    chatMessage?: any,
    chatMessages?: any
}

class ChatGroupScreen extends Component<Props, States> {

    static navigationOptions = {
        header: null,//works with createStackNavigator but not with createBottomTabNavigator
    };

    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: []
        };
    }

    chatMessage = (text) => {
        this.setState({
            chatMessage: text
        })
    };

    submitMessage = () => {
        this.setState({
            chatMessages: this.state.chatMessages.concat(this.state.chatMessage),
            chatMessage: ""
        })
    };


    render() {
        const {navigation} = this.props;
        const messages = this.state.chatMessages.map((message, i) => (
            <Text style={ChatGroupScreenStyles.message} key={i}>
                {message}
            </Text>
        ));
        return (
            <View style={{flex: 1}}>
                <View style={ChatGroupScreenStyles.containerHeader}>
                    <View style={ChatGroupScreenStyles.header}>
                        <TouchableOpacity
                            style={ChatGroupScreenStyles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-arrow-back' size={32} color={Colors.white}/>
                        </TouchableOpacity>
                        <Text style={ChatGroupScreenStyles.nameGroup}>{navigation.getParam('nameGroup')}</Text>
                        <View>
                            <TouchableOpacity onPress={() => {
                                alert('Ok');
                            }}>
                                <MaterialCommunityIcons name='dots-vertical-circle-outline' size={32}
                                                        color={Colors.white}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}/>
                {messages}
                <View style={ChatGroupScreenStyles.footer}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={{marginTop: 7, marginLeft: 5}}>
                            <FontAwesome name={'file-picture-o'} size={25} color={Colors.tintColor}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 8, marginLeft: -7}}>
                        <TextInput
                            style={ChatGroupScreenStyles.input}
                            autoCapitalize={'none'}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            placeholderTextColor={'gray'}
                            underlineColorAndroid="transparent"
                            placeholder="Soạn tin nhắn"
                            value={this.state.chatMessage}
                            onChangeText={this.chatMessage}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={ChatGroupScreenStyles.send}
                                          onPress={this.submitMessage}
                        >
                            <Ionicons1 name={'ios-send'} size={20} color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


export default ChatGroupScreen;
