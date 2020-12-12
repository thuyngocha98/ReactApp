import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    SectionList
} from 'react-native';
import styles from "../../../styles/FriendsScreenStyles/OweTripDetailsMemberScreenStyle/ListItemDetailsMemberStyle";
import ListItemDetailsContent from "./ListItemDetailsContent";

type Props = {
    navigation?: any,
}
class ListItemDetailsMember extends Component<Props> {


    data = [
        {
            title: "tháng 10 2019",
            data: [
                {
                    id: 0,
                    month: "thg 10",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 1,
                    month: "thg 10",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
                {
                    id: 2,
                    month: "thg 10",
                    day: "27",
                    title: "Dinner",
                    detail: "You paid 50,00 US$",
                    titleMoney: "you lent",
                    money: "20,00 US$"
                },
                {
                    id: 3,
                    month: "thg 10",
                    day: "25",
                    title: "Hotel",
                    detail: "You paid 200,00 US$",
                    titleMoney: "you lent",
                    money: "100,00 US$"
                },
                {
                    id: 4,
                    month: "thg 10",
                    day: "26",
                    title: "Restaurant",
                    detail: "You paid 500,00 US$",
                    titleMoney: "you lent",
                    money: "250,00 US$"
                },
            ]
        },
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

    render() {
        const {navigation} = this.props;
        return (
            <View  style={styles.marginTop}>
                <SectionList
                    sections={this.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MainDetailsWhoPaidScreen') }
                        >
                            <ListItemDetailsContent
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
                        <View style={styles.dateTitle}>
                            <Text style={styles.date}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default ListItemDetailsMember;
