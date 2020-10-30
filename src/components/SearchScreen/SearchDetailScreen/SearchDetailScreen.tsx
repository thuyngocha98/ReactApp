import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import ListItem from './Listitem';
import { BASEURL } from '../../../api/api';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';

function mapStateToProps(state) {
    return {

    };
}


type States = {
    data?: any[],
    loading?: boolean
}

type Props = {
    navigation?: any,
}

class SearchDetailScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        data: [],
        loading: false
    }

    componentDidMount() {
        const data = this.props.navigation.getParam('data', '');
        this.callApiGetDetail(data.code);
    }

    callApiGetDetail = code => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/search/get_detail_location/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    }

    renderListHeader = data => (
        <View>
            <View style={styles.imageHeader}>
                <Image
                    style={styles.image}
                    source={{ uri: BASEURL + "/images/main/" + data.url }}
                />
            </View>
            <View style={styles.viewTitle}>
                <Text style={styles.textRecommend}>Introduce</Text>
                <Text style={styles.textDesc}>{data.desc}...</Text>
            </View>
            <View style={styles.underLine} />
            <View style={{ marginHorizontal: screenWidth / 20.55, marginVertical: screenWidth / 41.1, }}>
                <Text style={styles.textRecommend}>Top sights</Text>
            </View>
        </View>
    )
    
    render() {
        const data = this.props.navigation.getParam('data', '');
        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('SearchScreen');
                            }}
                        >
                            <Ionicons name='md-arrow-back' size={28} color={Colors.white} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.addContact}>{data.title}</Text>
                        <TouchableOpacity
                            style={styles.save}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('SelectPlanTripScreen', {
                                    data: this.state.data,
                                    title: data.title,
                                    code: data.code
                                });
                            }}
                        >
                            <Text style={styles.textHeaderLeft}>Plan trip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <FlatList
                        initialNumToRender={14}
                        ListHeaderComponent={this.renderListHeader(data)}
                        ListFooterComponent={() => (
                            <View style={styles.activityIndicator}>
                                {this.state.loading && (
                                    <LottieView
                                        style={styles.viewLottie}
                                        source={require('../../../../assets/lotties/WaveLoading.json')}
                                        autoPlay
                                        loop
                                    />
                                )}
                            </View>
                        )}
                        data={this.state.data}
                        numColumns={2}
                        removeClippedSubviews={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate('DescriptionLocationScreen', {data: item})}>
                                <ListItem
                                    data={item}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item._id.toString()}
                    />
                    
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + Constants.statusBarHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addContact: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        paddingLeft: screenWidth/27,
        paddingRight: screenWidth/24,
        paddingVertical: screenWidth/72,
    },
    save: {
        paddingRight: screenWidth/27,
        paddingLeft: screenWidth/27,
        paddingVertical: screenWidth/72,
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
        margin: screenWidth / 27.4,
    },
    textRecommend: {
        fontSize: 17,
        color: Colors.tintColor
    },
    textDesc: {
        fontSize: 15,
        color: Colors.blackText
    },
    underLine: {
        width: screenWidth,
        height: screenWidth / 82.2,
        backgroundColor: Colors.lavender
    },
    listItem: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    activityIndicator: {
        marginTop: screenWidth/24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLottie: {
        width: screenWidth/3.6,
        height: screenWidth/3.6,
    },
});

export default connect(
    mapStateToProps,
)(SearchDetailScreen);