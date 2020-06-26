import React from 'react';
import {StyleSheet} from "react-native";
import { Button, Icon } from 'native-base';
const ICON_SIZE = 40;

const GetPlayButtonByStatus = (props) => {
    if (props.recordStatus === 'RECORDING') {
        return (
            <Button
                disabled
                style={{ ...styles.buttonStyle }}
                onPress={() => {}}
            >
                <Icon
                    type="FontAwesome"
                    name="play"
                    color="white"
                    style={{ fontSize: ICON_SIZE }}
                />
            </Button>
        );
    } else {
        if (
            props.playStatus === 'BUFFERING' ||
            props.playStatus === 'LOADING' ||
            props.playStatus === 'NO_SOUND_FILE_AVAILABLE'
        ) {
            return (
                <Button disabled style={[styles.buttonStyle]} onPress={() => {}}>
                    <Icon
                        type="FontAwesome"
                        name="hourglass"
                        color="white"
                        style={{ fontSize: ICON_SIZE - 6 }}
                    />
                </Button>
            );
        } else if (props.playStatus === 'PAUSED') {
            return (
                <Button
                    success
                    style={[styles.buttonStyle]}
                    onPress={props.onPlayPress}
                >
                    <Icon
                        type="FontAwesome"
                        name="play"
                        color="white"
                        style={{ fontSize: ICON_SIZE }}
                    />
                </Button>
            );
        } else if (props.playStatus === 'STOPPED') {
            return (
                <Button
                    success
                    style={[styles.buttonStyle]}
                    onPress={props.onPlayPress}
                >
                    <Icon
                        type="FontAwesome"
                        name="play"
                        color="white"
                        style={{ fontSize: ICON_SIZE  }}
                    />
                </Button>
            );
        } else if (props.playStatus === 'PLAYING') {
            return (
                <Button danger style={styles.buttonStyle} onPress={props.onPausePress}>
                    <Icon
                        type="FontAwesome"
                        name="pause"
                        color="white"
                        style={{ fontSize: ICON_SIZE - 6 }}
                    />
                </Button>
            );
        } else if (props.playStatus === 'ERROR') {
            return (
                <Button danger style={styles.buttonStyle} onPress={() => {}}>
                    <Icon
                        type="FontAwesome"
                        name="exclamation-triangle"
                        color="white"
                        style={{ fontSize: ICON_SIZE - 10}}
                    />
                </Button>
            );
        } else {
            console.warn(
                `GetPlayButtonByStatus: unknown playStatus ${props.playStatus}`
            );
            return (
                <Button danger style={styles.buttonStyle} onPress={() => {}}>
                    <Icon
                        type="FontAwesome"
                        name="question-circle"
                        color="white"
                        style={{ fontSize: ICON_SIZE }}
                    />
                </Button>
            );
        }
    }
};


const  styles = StyleSheet.create({
    buttonStyle : {
        width: 64,
        height: 64,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GetPlayButtonByStatus;
