import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, StatusBar, FlatList, Image, ScrollView } from 'react-native'
import { BASEURL } from '../../../../api/api';
import { screenWidth } from '../../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import Constants from 'expo-constants';

type Props = {
    navigation?: any
}

type States = {
    pageNum?: number,
}

export class DescriptionLocationInTripScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        pageNum: 0,
    }

    render() {
        const handleScroll = event => {
            let contentOffset = event.nativeEvent.contentOffset;
            let viewSize = event.nativeEvent.layoutMeasurement;
            // Divide the horizontal offset by the width of the view to see which page is visible
            let page = Math.floor(
              (contentOffset.x + 0.5 * viewSize.width) / viewSize.width,
            );
            this.setState({pageNum: page})
          };
        const data = this.props.navigation.getParam('data', '');
        const images = data.images
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={'transparent'} translucent />
                <TouchableOpacity
                 onPress={() => this.props.navigation.goBack()}
                 style={styles.iconBack}>
                    <Ionicons name='md-arrow-back' size={28} color={Colors.gray} />
                </TouchableOpacity>
                <View style={styles.viewList}>
                    <FlatList
                    data={images}
                    onScroll={handleScroll}
                    renderItem={({item}) => (
                        <View style={styles.viewImage}>
                            <Image 
                                source={{ uri: BASEURL + "/images/main/" +  item }} 
                                style={styles.image} />
                        </View>
                    )}
                    bounces={false}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.toString()}
                    windowSize={1}
                    />
                 </View>
                 <View style={styles.viewDot}>
                    {images.map((item,index) => (
                        <View
                            key={item}
                            style={this.state.pageNum == index ? styles.activeDot : styles.dot}
                        />
                    ))}
                </View>
                <View style={{flex: 1}}>
                    <ScrollView style={styles.desc}>
                        <Text style={styles.txtDesc}>{data.description}</Text>
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

export default DescriptionLocationInTripScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    iconBack: {
        marginTop: Constants.statusBarHeight + screenWidth/36,
        marginLeft: screenWidth/24,
        padding: screenWidth/72,
        width: screenWidth/7,
    },
    viewList: {
    },
    viewImage: {
        width: screenWidth,
        height: screenWidth/2.3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        width: screenWidth - screenWidth/3,
        height: (screenWidth - screenWidth/3)/1.6964,
        borderRadius: screenWidth/24,
        resizeMode: 'cover'
    },
    viewDot: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: screenWidth/36
    },
    dot: {
        width: screenWidth/60,
        height: screenWidth/60,
        borderRadius: screenWidth/120,
        marginRight: screenWidth/36,
        backgroundColor: Colors.gray
    },
    activeDot: {
        width: screenWidth/45,
        height: screenWidth/45,
        borderRadius: screenWidth/90,
        marginRight: screenWidth/36,
        backgroundColor: Colors.tintColor
    },
    desc: {
        flex: 1,
        paddingHorizontal: screenWidth/24
    },
    txtDesc: {
        color: Colors.blackText,
        fontSize: 14,
        marginBottom: screenWidth/24,
    }
});

