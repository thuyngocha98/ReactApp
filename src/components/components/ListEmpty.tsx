import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
import { screenHeight, screenWidth } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function ListEmpty({title, titleAction, action}) {
    return (
        <View style={styles.container}>
            <LottieView
                style={styles.viewLottie}
                source={require('../../../assets/lotties/empty.json')}
                autoPlay
                loop
            />
            <Text style={styles.txtEmpty}>{title}</Text>
            {titleAction && 
            <TouchableOpacity onPress={action} style={styles.viewAction}>
                <MaterialIcons name={'add'} color={Colors.tintColor} size={25}/>
                <Text style={styles.txtAction}>{titleAction}</Text>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLottie: {
        width: screenWidth/3.6,
    },
    txtEmpty: {
        fontSize: 14,
        color: Colors.gray,
    },
    viewAction: {
        marginTop: screenHeight/56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtAction: {
        fontSize: 18,
        color: Colors.tintColor,
        textDecorationLine: 'underline',
        marginLeft: screenWidth/72,
    }
})
