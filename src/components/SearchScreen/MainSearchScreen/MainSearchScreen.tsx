import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar, FlatList, TouchableOpacity, Platform } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';
// @ts-ignore
import { SearchBar } from 'react-native-elements';
import ListItems from './Listitem';
import { BASEURL } from '../../../api/api';
import LottieView from 'lottie-react-native';

function mapStateToProps(state) {
    return {

    };
}

type States = {
    values?: string,
    data?: any[],
    loading?: boolean
}

type Props = {
    navigation?: any
}


class MainSearchScreen extends Component<Props, States> {
    
    state = {
        values: '',
        data: [],
        loading: false
    }

    arrayData = [];
    _navListener: any;

    componentDidMount() {
        this.getDataSearch();
        //set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            if(Platform.OS == 'android'){
                StatusBar.setBackgroundColor("transparent");
                StatusBar.setTranslucent(true);
            }
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    getDataSearch = async () => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/search/get_main_location`, {
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
                this.arrayData = res.data
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    };

    callApiSearch = text => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/search/search_location/${text}`, {
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

    timeout?: any;

    searchFilterFunction = text => {
        this.setState({values: text})
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if(text == ""){
                this.setState({
                    data: this.arrayData
                })
            }else {
               this.callApiSearch(text);
            }
        }, 800); // await 0.8s after stop input then call api
    };

    render() {
        return (
            <View style={styles.containerMain}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Điểm đến..."
                        clearIcon={{ size: 24, name: 'clear' }}
                        platform={Platform.OS == 'android' ? 'android' : 'default'}
                        lightTheme
                        round={true}
                        searchIcon={{ size: 26, name: 'search' }}
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.values}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.containerInput}
                        containerStyle={styles.containerSearchbar}
                    />
                </View>
                <View style={styles.listItem}>
                {this.state.loading ? (
                    <View style={styles.activityIndicator}>
                        <LottieView
                            style={styles.viewLottie}
                            source={require('../../../../assets/lotties/WaveLoading.json')}
                            autoPlay
                            loop
                        />
                    </View>
                ) : (
                        <FlatList
                            data={this.state.data}
                            removeClippedSubviews={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("SearchDetailScreen", { data: item });
                                    }}
                                >
                                    <ListItems item={item}/>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item._id.toString()}
                            initialNumToRender={4}
                            onEndReachedThreshold={0.4}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: Colors.background
    },
    container: {
        backgroundColor: Colors.tintColor
    },
    input: {
        width: screenWidth / 2.2,
        height: screenWidth / 9,
        fontSize: 16,
        color: Colors.black
    },
    containerInput: {
        backgroundColor: Colors.white,
        borderRadius: screenWidth / 82.2,
        elevation: 0,
    },
    containerSearchbar: {
        paddingHorizontal: screenWidth / 27.4,
        height: screenWidth / 3.7,
        paddingTop: screenWidth / 13.7,
        paddingBottom: screenWidth / 41.1,
        justifyContent: 'center',
        backgroundColor: Colors.tintColor,
        elevation: 0
    },
    listItem: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    viewLottie: {
        width: screenWidth/3.6,
        height: screenWidth/3.6,
    },
});

export default connect(
    mapStateToProps,
)(MainSearchScreen);
