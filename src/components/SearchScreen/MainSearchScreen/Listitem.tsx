import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { screenWidth } from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';


type Props = {
    title?: string,
    description?: string,
    img?: string,
}

export default class ListItems extends PureComponent<Props>{
    render() {
        const { title, description, img } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.styleImage}>
                    <Image
                        style={styles.photo}
                        source={{ uri: img }}
                    />
                </View>
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {description}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: screenWidth / 36,
        marginHorizontal: '4%',
        marginVertical: '2%',
        borderRadius: screenWidth / 45,
        backgroundColor: Colors.white,
        marginBottom: screenWidth / 72,
        marginTop: screenWidth / 36,
    },
    styleImage: {
        borderTopLeftRadius: screenWidth/82.2,
        borderBottomLeftRadius: screenWidth/82.2,
        borderTopRightRadius: screenWidth/82.2,
        borderBottomRightRadius: screenWidth/82.2,
        overflow: 'hidden',
    },
    photo: {
        width: screenWidth/2.74,
        height: screenWidth/4.84,
        resizeMode: 'contain',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '5%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 17,
        color: Colors.black,
        paddingBottom: screenWidth/82.2

    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777777'
    },
});