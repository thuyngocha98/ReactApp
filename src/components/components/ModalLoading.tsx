import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { screenWidth } from '../../constants/Dimensions';

export default function ModalLoading({isVisible, ...props}) {
    return (
        <Modal
          {...props}
          isVisible={isVisible}
          style={styles.mainModalLoading}
          coverScreen={false}
          animationIn="fadeIn"
          animationOut="fadeOut"
          deviceHeight={Dimensions.get('screen').height}
          >
            <View style={styles.viewModalLoading}>
                <LottieView
                    style={styles.viewLottie}
                    source={require('../../../assets/lotties/WaveLoading.json')}
                    autoPlay
                    loop
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModalLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    viewModalLoading: {

    },
    viewLottie: {
    width: screenWidth/3.6,
    height: screenWidth/3.6,
    },
})
