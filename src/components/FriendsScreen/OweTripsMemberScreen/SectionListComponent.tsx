import React, {Component} from 'react';
import {View, Text, SectionList, TouchableOpacity, Alert} from "react-native";
import SectionListContent from "./SectionListContent";
import styles from "../../../styles/FriendsScreenStyles/OweTripMemberScreenStyle/SectionListComponentStyle";
// @ts-ignore
import hotel from '../../../../assets/images/hotel.png';
// @ts-ignore
import restaurant from '../../../../assets/images/restaurant.png';

type Props = {
    navigation?: any
};

class SectionListComponent extends Component<Props> {
    state = {
        data: [
            {
                title: "tháng 10 2019",
                data: [
                    {
                        id: 0,
                        month: "thg 10",
                        day: "25",
                        image: hotel,
                        title: "Hotel",
                        titleMoney: "you are owed",
                        money: "100,00 US$"
                    },
                    {
                        id: 1,
                        month: "thg 10",
                        day: "26",
                        image: restaurant,
                        title: "Restaurant",
                        titleMoney: "you are owed",
                        money: "250,00 US$"
                    }
                ]
            },
            {
                title: "tháng 9 2019",
                data: [
                    {
                        id: 0,
                        month: "thg 9",
                        day: "25",
                        image: hotel,
                        title: "Hotel",
                        titleMoney: "you are owed",
                        money: "100,00 US$"
                    },
                    {
                        month: "thg 9",
                        day: "26",
                        image: restaurant,
                        title: "Restaurant",
                        titleMoney: "you are owed",
                        money: "250,00 US$"
                    },
                ]
            }
        ]

    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.marginTop}>
                <SectionList
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HeaderOweTripDetailsMemberScreen')}
                        >
                            <SectionListContent
                                month={item.month}
                                day={item.day}
                                image={item.image}
                                title={item.title}
                                titleMoney={item.titleMoney}
                                money={item.money}
                            />
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.dateTitle}>
                            <Text style={styles.date}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default SectionListComponent;
