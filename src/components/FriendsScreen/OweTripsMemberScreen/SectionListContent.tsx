import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import styles from "../../../styles/FriendsScreenStyles/OweTripMemberScreenStyle/SectionListContentStyle";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';



type Props = {
    month?: string,
    day?: string,
    image?: any,
    title?: string,
    titleMoney?: string,
    money?: string,
}

class SectionListContent extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.time}>
                    <Text >{this.props.month}</Text>
                    <Text >{this.props.day}</Text>
                </View>
                <View style={styles.image}>
                    <Image source={this.props.image}/>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.title}</Text>
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

export default SectionListContent;
