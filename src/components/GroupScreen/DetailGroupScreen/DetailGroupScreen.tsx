import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    Alert,
    FlatList,
    StatusBar,
    SectionList
} from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import { Ionicons, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import HeaderTitleComponent from './HeaderTitleComponent';
import { screenWidth } from '../../../constants/Dimensions';
import ListItemContent from './ListItemContent';
import Constants from 'expo-constants';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class DetailGroupScreen extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    _navListener: any;

    componentDidMount() {
        // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    data = [
        {
            title: "tháng 9 2019",
            data: [
                {
                    id: 0,
                    month: "thg 9",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 1,
                    month: "thg 9",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
                {
                    id: 2,
                    month: "thg 9",
                    day: "27",
                    title: "Dinner",
                    detail: "You paid 50,00 US$",
                    titleMoney: "you lent",
                    money: "20,00 US$"
                },
                {
                    id: 3,
                    month: "thg 9",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 4,
                    month: "thg 9",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
            ]
        },
        {
            title: "tháng 8 2019",
            data: [
                {
                    id: 0,
                    month: "thg 9",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    month: "thg 9",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },

            ]
        },
        {
            title: "tháng 7 2019",
            data: [
                {
                    id: 0,
                    month: "thg 9",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 1,
                    month: "thg 9",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
                {
                    id: 2,
                    month: "thg 9",
                    day: "27",
                    title: "Dinner",
                    detail: "You paid 50,00 US$",
                    titleMoney: "you lent",
                    money: "20,00 US$"
                },
                {
                    id: 3,
                    month: "thg 9",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 4,
                    month: "thg 9",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
            ]
        }
    ];

    _ItemSeparatorComponent = () => {
        return (
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    }


    render() {
        const nameGroup = this.props.navigation.getParam('nameGroup', 'NO Name')
        return (
            <View style={DetailGroupScreenStyles.mainContainer}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={DetailGroupScreenStyles.header}>
                    <HeaderTitleComponent navigation={this.props.navigation} nameGroup={nameGroup} />
                </View>
                <SectionList
                    sections={this.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(item.title)
                            }}
                        >
                            <ListItemContent
                                month={item.month}
                                day={item.day}
                                title={item.title}
                                detail={item.detail}
                                titleMoney={item.titleMoney}
                                money={item.money}
                            />
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={DetailGroupScreenStyles.dateTitle}>
                            <Text style={DetailGroupScreenStyles.date}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(DetailGroupScreen);
