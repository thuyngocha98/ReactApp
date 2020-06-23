import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, View, TextInput, YellowBox} from "react-native";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import ChatGroupScreenStyles from "../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons1 from "react-native-vector-icons/Ionicons";
import {BASEURL} from "../../../api/api";
import SocketIOClient from 'socket.io-client';
import {data} from "../../SearchScreen/MainSearchScreen/dataListitem";


type Props = {
    _id?: any;
    navigation?: any,
    nameGroup?: any,
    user?: any[],
}

type States = {
    user_id?: string,
    isMessage?: boolean,
    chatMessage?: any,
    chatMessages?: any,
}

function mapStateToProps(state) {
    return {
        user: state.dataUser.dataUser,
    };
}

class ChatGroupScreen extends Component<Props, States> {

    static navigationOptions = {
        header: null,//works with createStackNavigator but not with createBottomTabNavigator
    };

    socket = SocketIOClient(`${BASEURL}`);
    state = {
        isMessage: false,
        chatMessage: "",
        chatMessages: []
    };

    dataTrip = this.props.navigation.getParam('dataTrip');

    componentDidMount(): void {
        this.socket.on("chat message", msg => {
            this.setState({
                chatMessages: this.state.chatMessages.concat(msg[2])
            });
        });
    }


    componentWillUnmount() {
        this.socket.off("chat message")
    }

    chatMessage = (text) => {
        if (text === "") {
            this.setState({
                isMessage: false,
                chatMessage: text
            })
        } else {
            this.setState({
                isMessage: true,
                chatMessage: text
            })
        }
    };




    submitMessage = () => {
        if (this.state.chatMessage.length > 0) {
            this.socket.emit('chat message', [this.dataTrip._id,this.props.user._id, this.state.chatMessage]);
            this.setState({chatMessage: ''});
        }
    };




    render() {
        console.log(this.props.user);
        const lengthMessage = this.state.chatMessage.length;
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
                        <Text style={ChatGroupScreenStyles.nameGroup}>{this.dataTrip.name}</Text>
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
                    <View style={{flex: 8.5, marginLeft: -5}}>
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
                        {lengthMessage > 0 ?
                            <TouchableOpacity
                                style={ChatGroupScreenStyles.send}
                                onPress={this.submitMessage}
                            >
                                < Ionicons1 name={'ios-send'} size={20} color={Colors.white}/>
                            </TouchableOpacity> :
                            <TouchableOpacity style={ChatGroupScreenStyles.microphone}>
                                <FontAwesome name={'microphone'} size={30} color={Colors.tintColor}/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>

        );
    }
}


export default connect(mapStateToProps,null) (ChatGroupScreen);
