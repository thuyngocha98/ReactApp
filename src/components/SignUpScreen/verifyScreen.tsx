import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated, Alert, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';
import verifyScreenStyles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from '../../styles/SignUpScreenStyle/verifyScreenStyles';
import { BASEURL } from '../../api/api';
import { bindActionCreators } from 'redux';
import { getApiDataUser } from '../../actions/action';

type Props = {
    navigation?: any,
    getDataUser?: any,
}

type States = {
    pinCode?: number,
}

const codeLength = 5;

const source = {
    uri:
        'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

class verifyScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        pinCode: null
    }

    _animationsColor = [...new Array(codeLength)].map(
        () => new Animated.Value(0),
    );
    _animationsScale = [...new Array(codeLength)].map(
        () => new Animated.Value(1),
    );

    onFinishCheckingCode = code => {
        this.setState({
            pinCode: code,
        })
    };
    handlerOnFulfill: (code: string) => void;

    animateCell({ hasValue, index, isFocused }) {
        Animated.parallel([
            Animated.timing(this._animationsColor[index], {
                toValue: isFocused ? 1 : 0,
                duration: 250,
            }),
            Animated.spring(this._animationsScale[index], {
                toValue: hasValue ? 0 : 1,
                delay: hasValue ? 200 : 150,
            }),
        ]).start();
    }

    cellProps = ({ hasValue, index, isFocused }) => {
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? this._animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : this._animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: this._animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: this._animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            this.animateCell({ hasValue, index, isFocused });
        }, 0);

        return {
            style: [verifyScreenStyles.input, animatedCellStyle],
        };
    };

    containerProps = { style: verifyScreenStyles.inputWrapStyle };

    signUp = async () => {
        if (this.state.pinCode) {
            const data = {
                secretToken: this.state.pinCode
            };
            const json = JSON.stringify(data);
            fetch(`${BASEURL}/api/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: json
            })
                .then((response) => response.json())
                .then(async (res) => {
                    if (res.error) {
                        Alert.alert(res.error);
                    } else {
                        await AsyncStorage.setItem('jwt', res.token)
                        this.getDataUserForRedux();
                        Alert.alert(
                            'Correct Verification',
                            `Let's go`,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.navigate("FriendsScreen")
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
        } else {
            Alert.alert('Please enter PIN verification');
        }
    };

    async getDataUserForRedux() {
        const dataUser = await this.props.getDataUser();
        if (dataUser !== null) {
            // this.props.navigation.navigate('FriendsScreen');
        }
        else {
            console.log("error retrieve data user")
        }
    }



    render() {
        /*concept : https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments */
        return (
            <View style={verifyScreenStyles.inputWrapper}>
                <Text style={verifyScreenStyles.inputLabel}>Verification</Text>
                <Image style={verifyScreenStyles.icon} source={source} />
                <Text style={verifyScreenStyles.inputSubLabel}>
                    {'Please enter the verification code\nwe send to your email address'}
                </Text>
                <CodeFiled
                    maskSymbol=" "
                    variant="clear"
                    codeLength={codeLength}
                    keyboardType="numeric"
                    cellProps={this.cellProps.bind(this)}
                    containerProps={this.containerProps}
                    onFulfill={this.onFinishCheckingCode}
                    CellComponent={Animated.Text}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        this.signUp()
                    }}
                >
                    <View style={verifyScreenStyles.nextButton}>
                        <Text style={verifyScreenStyles.nextButtonText}>Verify</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getDataUser: getApiDataUser
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(verifyScreen);