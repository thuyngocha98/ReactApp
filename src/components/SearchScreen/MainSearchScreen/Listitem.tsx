import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { screenWidth } from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';
import { BASEURL } from '../../../api/api';


type Props = {
    item?: {
        title?: string,
        desc?: string,
        url?: string,
        resultSearch?: string,
    }
}

export default class ListItems extends PureComponent<Props>{
    render() {
        const { item } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.styleImage}>
                        <Image
                            style={styles.photo}
                            source={{ uri: BASEURL+"/images/main/"+ item.url }}
                        />
                    </View>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {item.desc}
                        </Text>
                    </View>
                </View>
                {item?.resultSearch && (
                    <Text style={styles.txtResultSearch} numberOfLines={1}>
                        {item.resultSearch}
                    </Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: screenWidth/24,
        padding: screenWidth / 36,
        backgroundColor: Colors.white,
        marginTop: screenWidth / 36,
        borderRadius: screenWidth / 45,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: screenWidth / 72,
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
        color: Colors.gray
    },
    txtResultSearch: {
        fontSize: 12,
        color: Colors.tintColor,
        fontStyle: 'italic'
    }
});