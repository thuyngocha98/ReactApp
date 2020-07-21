import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from "../../../styles/FriendsScreenStyles/OweTripDetailsMemberScreenStyle/ListItemDetailsContentStyle";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

type Props = {
    month?: string,
    day?: string,
    title?: string,
    detail?: string,
    titleMoney?: string,
    money?: string,
}


class ListItemDetailsContent extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.time}>
                    <Text style={styles.month}>{this.props.month}</Text>
                    <Text style={styles.day}>{this.props.day}</Text>
                </View>
                <View style={styles.iconTitle}>
                    <FontAwesome5 name='city' size={20} color={Colors.lightgray} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.detail} numberOfLines={1}>{this.props.detail}</Text>
                </View>
                <View style={styles.totalMoney}>
                    <Text style={styles.titleMoney}>{this.props.titleMoney}</Text>
                    <Text style={styles.money}>{this.props.money}</Text>
                </View>
                <View style={styles.iconDetail}>
                    <FontAwesome5 name='chevron-right' size={20} color={Colors.lightgray} />
                </View>
            </View>
        );
    }
}

export default ListItemDetailsContent;
