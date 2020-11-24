import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import { screenHeight, screenWidth } from '../../constants/Dimensions';

export default function ModalNotification({ 
    type, 
    modalVisible, 
    onPress, 
    title, 
    description,
    txtButton,
    ...props
}) {
    const Icon = type == 'success' ? (
        require('../../../assets/images/Success.png')
    ) : (
        type == 'warning' ? (
            require('../../../assets/images/Warning.png')
        ) : (
            require('../../../assets/images/Error.png')
        )
    );

    const color = type == 'success' ? (
        Colors.mediumseagreen
    ) : (
        type == 'warning' ? (
            Colors.warningBackground
        ) : (
            Colors.orangered
        )
    );
    return (
        <Modal
        {...props}
        avoidKeyboard
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={modalVisible}
        style={styles.mainModal}
        coverScreen={false}
        deviceHeight={Dimensions.get('screen').height}
        >
            <View style={styles.viewModal}>
                <Image source={Icon} style={[styles.image, {tintColor: color}]}/>
                    <Text style={styles.txtTitle}>{title}</Text>
                <Text style={styles.txtDesc}>{description}</Text>
                <TouchableOpacity
                onPress={onPress}
                style={[styles.viewButton, {backgroundColor: color}]}>
                    <Text style={styles.txtBtn}>{txtButton}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModal: {
        justifyContent: 'center',
        paddingHorizontal: screenWidth/7
    },
    viewModal: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderRadius: screenHeight/36,
        paddingHorizontal: screenWidth/10,
        paddingVertical: screenHeight/43,
    },
    image: {
        resizeMode: 'cover',
        marginVertical: screenHeight/128,
        width: screenWidth/5,
        height: screenWidth/5,
        alignSelf: 'center',
    },
    viewButton: {
        alignSelf: 'center',
        width: screenWidth/3.3,
        marginTop: screenHeight/48,
        marginBottom: screenHeight/64,
        paddingHorizontal: screenWidth/36,
        paddingVertical: screenHeight/80,
        backgroundColor: Colors.tintColor,
        borderRadius: screenHeight/43,
    },
    txtTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: screenHeight/48,
        marginBottom: screenHeight/128,
        textAlign: 'center'
    },
    txtDesc: {
        marginBottom: screenHeight/64,
        fontSize: 16,
        color: Colors.gray,
        textAlign: 'center'
    },
    txtBtn: {
        fontSize: 17,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
