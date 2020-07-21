import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, ToastAndroid, Image, Button } from 'react-native';
import Colors from '../../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../../constants/Dimensions';
import { FlatList } from 'react-native-gesture-handler';
import { BASEURL } from '../../../../api/api';
import { Video } from 'expo-av';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

type States = {
    data?: any,
    isPlay?: any[],
    dataVideo?: any,
}

class ShowImagesScreen extends Component<Props, States> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };
    state = {
        data: [],
        isPlay: [],
        dataVideo: [],
    }
    tripId = '';
    _navListener: any;

    componentDidMount() {

        //set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.tripId = this.props.navigation.getParam('tripId', '');
            this.getImage(this.tripId);
            this.getVideo();
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    getImage = async tripId => {
        fetch(`${BASEURL}/api/trip/get_image_in_trip/${tripId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        data: res.data
                    })
                } else {
                    this.setState({
                        data: []
                    })
               }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getVideo = async () => {
        fetch(`${BASEURL}/api/trip/get_video`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        dataVideo: res.data
                    })
                } else {
                    this.setState({
                        dataVideo: []
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.containerHeader}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={styles.textHeaderLeft}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.addContact}>Travel Memories</Text>
                        <TouchableOpacity
                            style={styles.save}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.navigate('AddImagesScreen', { tripId: this.tripId })
                            }}
                        >
                            <Text
                                style={styles.add}
                            >
                                upload
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'column'}}>
                    <View style={styles.showImage}>
                        <View style={styles.title}>
                            <Button
                                title='Image Gallery'
                                onPress={() => { }}
                            />
                        </View>
                        <View style={styles.flatlist}>
                            <FlatList
                                scrollEnabled
                                data={this.state.data}
                                extraData={this.state}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <View style={styles.viewImage}>
                                        <Image
                                            resizeMode='cover'
                                            source={{ uri: `data:image/png;base64,${item}` }}
                                            style={styles.image}
                                        />
                                    </View>
                                )}
                                keyExtractor={item => item.toString()}
                            />
                        </View>
                    </View>
                    <View style={styles.showImage}>
                        <View style={styles.title1}>
                            <Button
                                title='Video Gallery'
                                onPress={() => { }}
                            />
                        </View>
                        <View style={styles.flatlist}>
                            <FlatList
                                scrollEnabled
                                data={this.state.dataVideo}
                                extraData={this.state}
                                numColumns={3}
                                renderItem={({ item, index }) => (
                                    <View style={styles.viewImage}>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                let { isPlay } = this.state;
                                                isPlay[index] = !this.state.isPlay[index];
                                                await this.setState({
                                                    isPlay,
                                                });
                                            }}
                                        >
                                            <Video
                                                source={{ uri: `${BASEURL}/video/${item}` }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode='cover'
                                                shouldPlay={this.state.isPlay[index]}
                                                isLooping={false}
                                                style={{ width: screenWidth / 3 - 2, height: screenWidth / 3 - 2, marginTop: 5 }}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                )}
                                keyExtractor={item => item.toString()}
                            />
                        </View>
                </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        flexDirection: 'column'
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
        flex: 5,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        flex: 2,
    },
    add: {

        fontSize: 17,
        color: Colors.white
    },
    save: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textHeaderLeft: {
        fontSize: 17,
        color: Colors.white
    },
    showImage: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        marginTop: 20,
        marginHorizontal:  20,
    },
    title1: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    txttitle: {
        fontSize: 17,
    },
    flatlist: {
        flex: 1,
    },
    viewImage: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    image: {
        marginTop: 5,
        width: screenWidth / 3 - 2,
        height: screenWidth / 3 - 2,
    }
});




export default connect(
    mapStateToProps,
)(ShowImagesScreen);