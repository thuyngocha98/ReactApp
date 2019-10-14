import React, { Component } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
// @ts-ignore
import styles from "../../../styles/FriendsScreenStyles/MainFriendsOweScreenStyle/MainFriendsOweScreenStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// @ts-ignore
import avatar from "../../../../assets/images/avatar.jpg";
import ListItemGroup from "../../GroupScreen/MainScreenGroup/ListItemGroup";
import Colors from "../../../constants/Colors";
import ListItemFriendsOwe from "./ListItemFriendsOwe";

type Props = {
    navigation?: any,
}

class MainFriendsOweScreen extends Component<Props> {

    state = {
        data: [
            {
                id: 0,
                nameFriend: 'Ha Tran',
                detail: 'owes you',
                money: '51,000 US$',
                data: [
                    {
                        id: 0,
                        description: 'Ha owes you',
                        money: ' 51,000 ',
                        type: 'US$ for "Ticket Movie"'
                    }
                ]
            },
            {
                id: 2,
                nameFriend: 'Trung Nguyen',
                detail: 'owes you',
                money: '40,000 US$',
                data: [
                    {
                        id: 0,
                        description: 'Ha owes you  ',
                        money: '40,000 ',
                        type: 'US$ for "Hotel"'
                    },

                ]
            },
            {
                id: 3,
                nameFriend: 'ZeTrunMin',
                detail: 'owes you',
                money: '100,000 US$',
                data: [
                    {
                        id: 0,
                        description: 'ZeTrunMin owes you ',
                        money: '30,000 ',
                        type: "US$ for \"Ticket Plan\""
                    },
                    {
                        id: 1,
                        description: 'ZeTrunMin owes you ',
                        money: '70,000 ',
                        type: 'US$ for "cake"',

                    }
                ]
            },
        ]
    };

    _ItemSeparatorComponent = () => {
        return (
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
        );
    };

    render() {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return (
            <View>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                <Text style={styles.friends}>
                    Friends
                </Text>
                <ScrollView>
                    <View style={styles.cartExpense}>
                        <Image style={styles.avatar} source={avatar} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'white' }}>Total balance</Text>
                            <Text style={styles.textDetail}>You are owned 305.151,00 US$</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <MaterialCommunityIcons color={'white'} size={25} name={'menu'} style={styles.iconMenu} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <ListItemFriendsOwe
                                        nameFriend={item.nameFriend}
                                        detail={item.detail}
                                        money={item.money}
                                        data={item.data}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                            ItemSeparatorComponent={this._ItemSeparatorComponent}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default MainFriendsOweScreen;
