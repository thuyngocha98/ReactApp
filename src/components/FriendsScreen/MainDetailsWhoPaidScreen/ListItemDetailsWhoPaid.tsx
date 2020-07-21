import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import Styles from "../../../styles/FriendsScreenStyles/MainDetailsWhoPaidScreenStyle/ListItemDetailsWhoPaidStyle";
import Colors from '../../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import ListDetailsWhoPaid from "./ListDetailsWhoPaid";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';


type Props = {
    namePaid?: string,
    money?:any,
    image?:any,
    data?: any[]
}

class ListItemDetailsWhoPaid extends Component<Props> {
    render() {
        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.container1}>
                    <Image
                        style={Styles.avatar}
                        source={this.props.image}
                    />
                    <View style={Styles.texts}>
                        <View style={Styles.namePaid}>
                            <Text style={Styles.personPaid}>{this.props.namePaid} paid</Text>
                            <Text style={Styles.personPaid}> {this.props.money}</Text>
                        </View>
                    </View>
                    <FontAwesome5 name='chevron-right' size={20} color={Colors.lightgray} />
                </View>
                <View>
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => (
                            <ListDetailsWhoPaid
                                image={item.image}
                                namePaid={item.namePaid}
                                owe={item.owe}
                                owes={item.owes}
                                money={item.money}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

export default ListItemDetailsWhoPaid;
