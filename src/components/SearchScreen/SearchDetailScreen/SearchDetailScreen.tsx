import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ImageBackground, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import ListItem from './Listitem';
import { ScrollView } from 'react-native-gesture-handler';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class SearchDetailScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    render() {
        const data = this.props.navigation.getParam('data', '');
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('SearchScreen');
                            }}
                        >
                            <Ionicons name='md-arrow-back' size={30} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.addContact}>{data.title}</Text>
                        <View style={styles.save} >
                            <Text style={styles.textHeaderLeft}>Plan a trip</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imageHeader}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.image }}
                    />
                </View>
                <View style={styles.viewTitle}>
                    <Text style={styles.textRecommend}>Giới Thiệu</Text>
                    <Text style={styles.textDesc}>{data.desc}...</Text>
                </View>
                <View style={styles.underLine} />
                <View style={{marginHorizontal: screenWidth/20.55, marginVertical: screenWidth/41.1,}}>
                    <Text style={styles.textRecommend}>Địa điểm nổi bật</Text>
                </View>
                <View style={styles.listItem}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data.data}
                        numColumns={2}
                        removeClippedSubviews={true}
                        renderItem={({ item }) => (
                            <ListItem
                                data={item}
                            />
                        )}
                        keyExtractor={item => item.title.toString()}
                    />
                </View>
            </ScrollView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textHeaderLeft: {
        fontSize: 16,
        color: Colors.white
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + StatusBar.currentHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: screenWidth / 27.43,
    },
    addContact: {
        flex: screenWidth/82.2,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        flex: 2,
    },
    save: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    imageHeader: {

    },
    image: {
        width: screenWidth,
        height: screenWidth / 1.7684,
        resizeMode: 'contain',
    },
    viewTitle: {
        flexDirection: 'column',
        margin: screenWidth/27.4,
    },
    textRecommend: {
        fontSize: 17,
        color: Colors.tintColor
    },
    textDesc: {
        fontSize: 15,
        color: Colors.black
    },
    underLine: {
        width: screenWidth,
        height: screenWidth/82.2,
        backgroundColor: Colors.lavender
    },
    listItem: {
        backgroundColor: Colors.white,
    },

});

export default connect(
    mapStateToProps,
)(SearchDetailScreen);