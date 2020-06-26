import React, {Component} from 'react';
import {StyleSheet, View, Slider, Platform} from 'react-native';
import {Constants, AppLoading} from 'expo';
import {Audio} from "expo-av";
import {Button, Text} from 'native-base';
import {Recorder, Player} from 'react-native-audio-player-recorder-no-linking';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


type Props = {}

type States = {
    soundFileInfo?: any,
    viewToShow?: string,
    loading?: boolean
}

const AUDIO_CLIP_URL = encodeURI(
    'https://upload.wikimedia.org/wikipedia/commons/3/3d/Africanagogosound.ogg'
);

class MainRecorder extends Component<Props, States> {

    constructor(props) {
        super(props);
        this.state = {
            soundFileInfo: 'sound file information will appear here',
            viewToShow: 'HOME',
            loading: true
        };
    }

    scroll: any;

    async componentWillMount() {
        this.setState({loading: false});
    }

    showRecorder = () => {
        this.setState({viewToShow: 'recorder'});
    };
    showPlayer = () => {
        this.setState({viewToShow: 'player'});
    };

    recorderComplete = (soundFileInfo) => {
        console.log('In app: ', {soundFileInfo});
        this.setState({
            viewToShow: 'HOME',
            soundFileInfo: JSON.stringify(soundFileInfo)
        });
    };

    playerComplete = () => {
        this.setState({
            viewToShow: 'HOME'
        });
    };

    renderScreen = () => {
        if (this.state.viewToShow === 'recorder') {
            return (
                <View
                    style={{
                        display: 'flex',
                        flex: 1
                    }}
                >
                    <Text>Sound Recorder</Text>
                    <Recorder
                        style={{flex: 1}}
                        onComplete={this.recorderComplete}
                        maxDurationMillis={150000}
                        showDebug={true}
                        showBackButton={true}
                        audioMode={{
                            allowsRecordingIOS: true,
                            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                            playsInSilentModeIOS: true,
                            playsInSilentLockedModeIOS: true,
                            shouldDuckAndroid: true,
                            interruptionModeAndroid:
                            Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                            playThroughEarpieceAndroid: false
                        }}
                        resetButton={(renderProps) => {
                            return (
                                <Button
                                    onPress={renderProps.onPress}
                                    danger
                                    block
                                    style={{marginVertical: 5}}
                                >
                                    <Text>Reset</Text>
                                </Button>
                            );
                        }}
                        recordingCompleteButton={(renderProps) => {
                            return (
                                <Button
                                    onPress={renderProps.onPress}
                                    block
                                    success
                                    style={{marginVertical: 5}}
                                >
                                    <Text>Finish</Text>
                                </Button>
                            );
                        }}
                        playbackSlider={(renderProps) => {
                            console.log({'maximumValue: ': renderProps.maximumValue});
                            return (
                                <Slider
                                    minimimValue={0}
                                    maximumValue={renderProps.maximumValue}
                                    onValueChange={renderProps.onSliderValueChange}
                                    value={renderProps.value}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            );
        } else if (this.state.viewToShow === 'player') {
            return (
                <View
                    style={{
                        display: 'flex',
                        flex: 1
                    }}
                >
                    <Text>Sound Player</Text>
                    <Player
                        style={{flex: 1}}
                        onComplete={this.playerComplete.bind(this)}
                        completeButtonText={'Return Home'}
                        uri={AUDIO_CLIP_URL}
                        showDebug={true}
                        showBackButton={true}
                        playbackSlider={(renderProps) => {
                            console.log({'maximumValue: ': renderProps.maximumValue});
                            return (
                                <Slider
                                    minimimValue={0}
                                    maximumValue={renderProps.maximumValue}
                                    onValueChange={renderProps.onSliderValueChange}
                                    value={renderProps.value}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            );
        } else if (this.state.viewToShow === 'HOME') {
            return (
                <View
                    style={{
                        flex: 1,
                        margin: 10,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            flex: 1,
                            display: 'flex',
                            alignSelf: 'center',
                            color: 'darkblue'
                        }}
                    >
                        {this.state.soundFileInfo}
                    </Text>
                    <Button
                        block
                        danger
                        onPress={this.showRecorder}
                        style={{marginVertical: 5}}
                    >
                        <Text>Record Sound</Text>
                    </Button>
                    <Button
                        block
                        success
                        onPress={this.showPlayer}
                        style={{marginVertical: 5}}
                    >
                        <Text>Play Music</Text>
                    </Button>
                </View>
            );
        } else return null;
    };


    render() {
        if (this.state.loading) {
            return <AppLoading/>
        } else {
            return (
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}
                        style={{ flex: 1 }}
                        innerRef={ref => { this.scroll = ref }}
                        keyboardShouldPersistTaps='always'
                    >
                        <View style={styles.statusBar}/>
                        <Text
                            style={{
                                margin: 10,
                                fontSize: 24,
                                color: 'black'
                            }}
                        >
                            Sound Demo App
                        </Text>

                        <View
                            style={{
                                backgroundColor: 'lightblue',
                                padding: 5,
                                display: 'flex',
                                flex: 2
                            }}
                        >
                            {this.renderScreen()}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#eee',
        flex: 1
    },
    statusBar: {
        backgroundColor: '#C2185B',
        height: Constants.statusBarHeight
    }
});

export default MainRecorder;
