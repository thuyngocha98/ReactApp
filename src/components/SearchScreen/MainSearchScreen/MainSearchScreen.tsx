import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, Animated } from 'react-native';
import Colors from '../../../constants/Colors';
import { screenWidth } from '../../../constants/Dimensions';
// @ts-ignore
import { SearchBar } from 'react-native-elements';
import ListItems from './Listitem';
import { data } from './dataListitem';

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
}

type Props = {
    navigation?: any
}



class MainSearchScreen extends Component<Props, States> {

    state = {
        values: '',
        data: data,
    };

    arrayData = data;
    _navListener: any;

    componentDidMount() {

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
                <View style={styles.listItem}>
                    <FlatList
                        data={this.state.data}
                        removeClippedSubviews={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("SearchDetailScreen", {data: item});
                                }}
                            >
                                <ListItems
                                    title={item.title}
                                    description={item.desc}
                                    img={item.image}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.title.toString()}
                        initialNumToRender={4}
                        onEndReachedThreshold={0.4}
                    />
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flexDirection: 'column',
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
        borderRadius: screenWidth/82.2,
        elevation: 0,
    },
    containerSearchbar: {
        paddingHorizontal: screenWidth/27.4,
        height: screenWidth / 3.7,
        paddingTop: screenWidth/13.7,
        paddingBottom: screenWidth/41.1,
        justifyContent: 'center',
        backgroundColor: Colors.tintColor,
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
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
        backgroundColor: Colors.tintColor
    },

});

export default connect(
    mapStateToProps,
)(MainSearchScreen);
