import React from 'react';
import { View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import verifyScreenStyles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from '../../styles/SignUpScreenStyle/verifyScreenStyles';
import { BASEURL } from '../../api/api';
import { getApiDataUser } from '../../actions/action';
import ModalNotification from '../components/ModalNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
const {Value, Text: AnimatedText} = Animated;
type Props = {
    navigation?: any,
    getDataUser?: any,
}

const CELL_COUNT = 5;

const source = {
    uri:
        'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const verifyScreen = (Props) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [modalNotification, setModalNotification] = React.useState({
        type: 'error',
        title: '',
        description: '',
        onPress: () => {},
    })

    const [isModalVisible, setModalVisible] = React.useState(false);

    const renderCell = ({index, symbol, isFocused}) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
          backgroundColor: hasValue
            ? animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
              })
            : animationsColor[index].interpolate({
                inputRange: [0, 1],
                outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
              }),
          borderRadius: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
          }),
          transform: [
            {
              scale: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 1],
              }),
            },
          ],
        };
        // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
        animateCell({hasValue, index, isFocused});
      }, 0);
  
      return (
        <AnimatedText
          key={index}
          style={[verifyScreenStyles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      );
    };


    const signUp = async () => {
        if (value) {
            const data = {
                secretToken: value,
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
                        setModalNotification({
                            type: 'error',
                            title: res.error,
                            description: 'Please check again.',
                            onPress: () => {},
                        });
                        setModalVisible(true);
                    } else {
                        await AsyncStorage.setItem('jwt', res.token)
                        await getDataUserForRedux();
                        Props.navigation.navigate("GroupScreen")
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            setModalNotification({
                type: 'error',
                title: 'Lỗi mã PIN',
                description: 'Vui lòng kiểm tra lại mã xác minh!',
                onPress: () => {},
            })
            setModalVisible(true);
        }
    };

    const getDataUserForRedux = async () => {
        await dispatch(getApiDataUser());
        Props.navigation.navigate('FriendsScreen');
    }

    return (
        <View style={{ flex: 1 }}>
            <ModalNotification
                type={modalNotification.type}
                modalVisible={isModalVisible}
                title={modalNotification.title}
                description={modalNotification.description}
                txtButton="Ok"
                onPress={() => setModalVisible(false)}
            />
            <View style={verifyScreenStyles.inputWrapper}>
                <Text style={verifyScreenStyles.inputLabel}>Xác Minh</Text>
                <Image style={verifyScreenStyles.icon} source={source} />
                <Text style={verifyScreenStyles.inputSubLabel}>
                    {'Vui lòng nhập mã xác minh\nChúng tôi đã gửi đến mail của bạn'}
                </Text>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={verifyScreenStyles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={signUp}
                >
                    <View style={verifyScreenStyles.nextButton}>
                        <Text style={verifyScreenStyles.nextButtonText}>Kích hoạt</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

verifyScreen.navigationOptions = {
    header: null,
};

export default verifyScreen;