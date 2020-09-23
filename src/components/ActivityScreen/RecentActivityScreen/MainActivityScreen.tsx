import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import styles from "../../../styles/ActivityScreenStyles/RecentActivityScreenStyle/MainActivityScreenStyle";
import ListItemActivity from "./ListItemActivity";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from "../../../../assets/images/toast.png";
// @ts-ignore
import car from "../../../../assets/images/car.png";
// @ts-ignore
import wifi from "../../../../assets/images/wifi.png";
// @ts-ignore
import puzzle from "../../../../assets/images/puzzle.png";
import { BASEURL } from '../../../api/api';
import Colors from '../../../constants/Colors';
import {SearchBar} from "react-native-elements";
import {screenWidth} from "../../../constants/Dimensions";

type Props = {
    navigation?: any
}

type States = {
    data?: any[],
    loading?: boolean,
    value?: string
}

class MainActivityScreen extends Component<Props,States> {
    state = {
        value: '',
        data: [],
        loading: false,
        data1: [
            {
                type: 'addItem',
                id: 0,
                typeImage: toast,
                avatar: avatar,
                name: 'You',
                method: 'added',
                nameItem: 'Drink',
                group: 'Hotel',
                owe: 'You get back $',
                money: '30,000.00',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'addItem',
                id: 1,
                avatar: avatar,
                name: 'Ha T.',
                method: 'added',
                nameItem: 'Resort',
                group: 'Hotel',
                owe: 'You owe $',
                money: '25.00',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'addItem',
                id: 2,
                typeImage: wifi,
                avatar: avatar,
                name: 'You',
                method: 'added',
                nameItem: 'wifi',
                group: 'Hotel',
                owe: 'You do not owe any thing',
                money: '',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'addMembers',
                id: 3,
                typeImage: puzzle,
                avatar: avatar,
                name: 'You',
                method: 'added',
                nameItem: '',
                nameFriend: 'Ha T.',
                group: 'Hotel',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'create',
                id: 4,
                typeImage: puzzle,
                avatar: avatar,
                name: 'You',
                method: 'create',
                group: 'We Go',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'update',
                id: 5,
                typeImage: puzzle,
                avatar: avatar,
                name: 'You',
                method: 'update',
                nameItem: '',
                nameFriend: 'Ha T.',
                group: 'Hotel',
                owe: 'You get back $',
                money: '30,000.00',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
            {
                type: 'delete',
                id: 6,
                typeImage: puzzle,
                avatar: avatar,
                name: 'You',
                method: 'delete',
                nameItem: '',
                nameFriend: 'Ha T.',
                group: 'Hotel',
                date: 'ngày 18 thg 9, 2019',
                time: '19:57'
            },
        ]
    };

    arrayData = [];
    _navListener: any;

    componentDidMount() {
        this.getDataActivity();
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

    getDataActivity = async () => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/userActivity/get_list_all_user_activity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    data: res.data.reverse(),
                    loading: false
                });
                this.arrayData = res.data.reverse()
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });
                console.log(error);
            });
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });
        const newData =   this.arrayData.filter(item => {
            const itemData = `${item.trip_id.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        })
    };

    render() {
        return (
            <View>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View >
                    <SearchBar
                        placeholder="Tìm Kiếm..."
                        lightTheme
                        clearIcon={{size: 24, name: 'clear'}}
                        round={true}
                        searchIcon={{size: 26, name: 'search'}}
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.value}
                        inputStyle={Styles.input}
                        inputContainerStyle={Styles.containerInput}
                        containerStyle={Styles.containerSearchBar}
                    />
                </View>
                <View style={styles.scrollView}>
                    <View>
                        <Text style={styles.title}>Recent activity</Text>
                    </View>
                    <View>{this.state.loading ? (
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator animating size="large" color={Colors.tintColor} />
                        </View>
                    ) : (
                            <View>
                                <FlatList
                                    scrollEnabled
                                    data={this.state.data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity >
                                            <ListItemActivity
                                                data={item}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item._id.toString()}
                                />
                            </View>
                        )}

                    </View>
                </View>
            </View >
        );
    }
}


const Styles = StyleSheet.create({
    containerMain: {
        flexDirection: 'column',
        backgroundColor: Colors.background
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
    containerSearchBar: {
        paddingHorizontal: screenWidth / 27.4,
        height: screenWidth / 3.7,
        paddingTop: screenWidth / 13.7,
        paddingBottom: screenWidth / 41.1,
        justifyContent: 'center',
        backgroundColor: Colors.tintColor,
    }
});


export default MainActivityScreen;
