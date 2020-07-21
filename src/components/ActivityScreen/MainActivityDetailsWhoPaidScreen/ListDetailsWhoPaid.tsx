import React, {Component} from 'react';
import { connect } from 'react-redux';
import Styles from "../../../styles/ActivityScreenStyles/MainActivityDetailsWhoPaidScreenStyle/ListDetailsWhoPaidStyle";
import { Entypo } from '@expo/vector-icons';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';

type Props = {
    image?:any,
    namePaid?: string,
    owe?:string,
    owes?:string,
    money?:any
}
class ListDetailsWhoPaid extends Component<Props> {
    render() {
        return (
            <View style={Styles.container}>
                <Entypo name='level-down' size={20} color={Colors.lightgray} />
                <View style={Styles.oweContainer}>
                    <Image style={Styles.image} source={this.props.image}/>
                    <Text >{this.props.namePaid}</Text>
                    <Text style={Styles.owe}>{this.props.owe}</Text>
                    <Text style={Styles.owes}>{this.props.owes}</Text>
                    <Text >{this.props.money}</Text>
                </View>
            </View>
        );
    }
}

export default ListDetailsWhoPaid;
