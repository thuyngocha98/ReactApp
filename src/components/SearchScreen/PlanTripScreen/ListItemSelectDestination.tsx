import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';
import { BASEURL } from '../../../api/api';

const ListItemSelectDestination = ({item, navigation, onPressAdd}) => {
    return (
        <View style={styles.viewItem}>
            <TouchableOpacity
             onPress={() => navigation.navigate('DescriptionLocationScreen', {data: item})}
             style={styles.viewImageAndTitle}>
                <View style={styles.viewImage}>
                    <Image
                        source={{uri:  BASEURL + "/images/main/" + item.url}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.viewContent}>
                    <Text numberOfLines={1} style={styles.txtTitle}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.txtDesc}>{item.desc == "null" ? "Not yet description" : item.desc}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressAdd}
                style={styles.viewAdd}>
                {item.selected ? (
                    <Ionicons name='ios-checkmark-circle' size={24} color={Colors.mediumseagreen} />
                ) : (
                    <Ionicons name='ios-add-circle' size={24} color={Colors.gray} />
                )} 
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ListItemSelectDestination);

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: screenWidth / 27.43,
        paddingVertical: screenWidth/27.43,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lavender
    },
    viewImageAndTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewImage: {
        width: screenWidth/3.8,
        height: screenWidth/6.43,
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: screenWidth/36
    },
    image: {
        width: screenWidth/3.8,
        height: screenWidth/6.43,
        resizeMode: 'cover'
    },
    viewContent: {
        flex: 1,
    },
    txtTitle: {
        color: Colors.blackText,
        fontSize: 13,
        fontWeight: 'bold',
    },
    txtDesc: {
        color: Colors.gray,
        fontSize: 13,
        fontStyle: 'italic'
    },
    viewAdd: {
        height: screenWidth/6.43,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: screenWidth / 27.43,
        paddingLeft: screenWidth/20,
    }
})
