import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Image, TouchableOpacity, StatusBar} from "react-native";
import styles from "../../../styles/ActivityScreenStyles/RecentActivityScreenStyle/MainActivityScreenStyle";
import ListItemActivity from "./ListItemActivity";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from "../../../../assets/images/toast.png";
// @ts-ignore
import car from "../../../../assets/images/car.png";
// @ts-ignore
import beach from "../../../../assets/images/beach.png";
// @ts-ignore
import wifi from "../../../../assets/images/wifi.png";
// @ts-ignore
import puzzle from "../../../../assets/images/puzzle.png";

type Props = {
    navigation?:any
}

class MainActivityScreen extends Component<Props> {
    state = {
        data: [
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
                typeImage: beach,
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

    onDetail = () => {
     this.props.navigation.navigate('MainActivityDetailsWhoPaidScreen')
    };

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                <ScrollView style={styles.scrollView}>
                    <View>
                        <Text style={styles.title}>Recent activity</Text>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={this.onDetail} >
                                    <ListItemActivity
                                        type={item.type}
                                        typeImage={item.typeImage}
                                        avatar={item.avatar}
                                        name={item.name}
                                        method={item.method}
                                        nameItem={item.nameItem}
                                        nameFriend={item.nameFriend}
                                        group={item.group}
                                        owe={item.owe}
                                        money={item.money}
                                        date={item.date}
                                        time={item.time}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}

                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default MainActivityScreen;
