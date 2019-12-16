import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';
// @ts-ignore
import { SearchBar } from 'react-native-elements';
import ListItems from './Listitem';
import { data } from './dataListitem';
import { BASEURL } from '../../../api/api';

function mapStateToProps(state) {
    return {

    };
}

const NAVBAR_HEIGHT = screenWidth / 3.7;
const STATUS_BAR_HEIGHT = 0;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList); // create animation

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
            // call api get list group
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    getDataSearch = async () => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/search/get_data_search`, {
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

    searchFilterFunction = text => {
        this.setState({
            values: text,
        });
        const newData = this.arrayData.filter(item => {
            const itemData = `${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        })
    };

    render() {
        return (
            <View style={styles.containerMain}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />

                <View style={styles.container}>
                    <SearchBar
                        placeholder="Điểm đến..."
                        lightTheme
                        clearIcon={{ size: 24, name: 'clear' }}
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
                <View style={styles.listItem}>{this.state.loading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={Colors.tintColor} />
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
                                    <ListItems
                                        title={item.title}
                                        description={item.desc}
                                        img={BASEURL+"/"+item.image}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.title.toString()}
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
        flexDirection: 'column',
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
    },
    listItem: {
        backgroundColor: Colors.background,
    },
    containerCategory: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: screenWidth / 27.7,
        backgroundColor: Colors.tintColor
    },
    line1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    line2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.background,
        marginTop: screenWidth / 13.4,
    },

});

export default connect(
    mapStateToProps,
)(MainSearchScreen);
