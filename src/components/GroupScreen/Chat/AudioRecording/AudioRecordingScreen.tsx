import React, {Component} from 'react';
import {Recorder, Player} from 'react-native-audio-player-recorder-no-linking';
import { Audio, FileSystem } from 'expo';
import * as Permissions from 'expo-permissions'
import {TouchableOpacity, View, Text, StyleSheet, Slider} from "react-native";
import ChatGroupScreenStyles from "../../../../styles/GroupsStyles/ChatGroupScreenStypes/ChatGroupScreenStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../../../constants/Colors";
import {Button} from 'native-base';

type Props = {};

type States = {
    isMicrophone?: boolean,
    haveRecordingPermissions?: any
}

class AudioRecordingScreen extends Component<Props, States> {

    static navigationOptions = {
        header: null
    };

    state = {
        isMicrophone: false,
        haveRecordingPermissions: false
    };

    askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === 'granted'
        });
    };

    microphone = async () => {
        this.setState({
            isMicrophone: true
        });
       await this.askForPermissions();
    };
    recorderComplete = () => {
        alert('ok');
    };

    render() {
        return (
            <View style={Styles.container}>

                <TouchableOpacity style={ChatGroupScreenStyles.microphone} onPress={this.microphone}>
                    <FontAwesome name={'microphone'} size={30} color={Colors.tintColor}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});

export default AudioRecordingScreen;
