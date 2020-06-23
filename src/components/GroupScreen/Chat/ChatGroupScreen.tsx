import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, View, TextInput, YellowBox, ScrollView, Image, Keyboard} from "react-native";

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
import {thumbnails} from '../../../constants/FunctionCommon';

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

    getTotalMessage = async () => {
        await fetch(`${BASEURL}/api/chat/get_messages_by_trip_id/${this.dataTrip._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then(async (res) => {
                this.setState({chatMessages: res.data})
            })
            .catch((error) => {
                alert(error);
            });

    };
    scroll: ScrollView;

    componentDidMount(): void {
        this.getTotalMessage();
        this.socket.on("chat message", msg => {
            if(msg[0].trip_id === this.dataTrip._id){
                this.setState({
                    chatMessages: this.state.chatMessages.concat(msg)
                });
            }
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

    customTime(time) {
        let date = new Date(time);
        let hours = '' + date.getHours();
        let tmp = 'AM';
        let minutes = date.getMinutes() + '';
        if(date.getHours() < 10){
            hours = "0" + date.getHours();
        }else if(date.getHours() >= 12){
            if(date.getHours() > 12)
                hours = date.getHours() - 12 + '';
            tmp = 'PM';
        }
        if(date.getMinutes() < 10)
            minutes = "0" + date.getMinutes();
        
        return hours+':'+minutes+" "+tmp;
    }

    render() {
        const lengthMessage = this.state.chatMessage.length;
        const {navigation} = this.props;
        const thumbnail = thumbnails["avatar1"];
        const messages = this.state.chatMessages.map((message, i) => 
            message.user_id_sender._id === this.props.user._id ? 
            (  
                <View key={message._id} style={{ marginRight: 10,marginTop:3,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <View style={{flex: 0.3}}/>
                    <View style={{flex: 0.7, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <View style={{borderRadius: 15, backgroundColor: "rgba(247,189,66,1)", flexDirection: 'column'}}>
                            <Text style={{textAlign: 'right',color: "#FFFFFF", marginTop: 4, marginHorizontal: 8, fontSize: 15}} >
                                {message.message}
                            </Text>
                            <Text style={{letterSpacing: 0.3,textAlign: 'right',color: "#FFFFFF", marginBottom: 4, marginHorizontal: 8, fontSize: 8}} >
                                {this.customTime(message.create_date)}
                            </Text>
                        </View>
                    </View>
                </View>
        ) : (
            <View key={message._id} style={{ marginLeft: 10,marginTop:3,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <View style={{marginRight: 3,width: 30, height: 30, borderRadius: 15, overflow: 'hidden'}}>
                        <Image 
                            source={thumbnail}
                            style={{width: 30, height: 30}}
                        />
                    </View>
                    <View style={{borderRadius: 15, backgroundColor: "#F1F0F0", flexDirection: 'column'}}>
                        <Text style={{textAlign: 'left',color: "rgba(0, 0, 0, 1)", marginTop: 4, marginHorizontal: 8, fontSize: 15}} >
                            {message.message}
                        </Text>
                        <Text style={{letterSpacing: 0.3,textAlign: 'right',color: "rgba(0, 0, 0, .40)", marginBottom: 4, marginHorizontal: 8, fontSize: 8}} >
                            {this.customTime(message.create_date)}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 0.3}}/>
            </View>
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
                    <ScrollView style={{flex: 1}}
                        ref={scroll => {this.scroll = scroll}}
                        onContentSizeChange={() => this.scroll.scrollToEnd({animated: true})}
                    >
                        {messages}
                    </ScrollView>
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
